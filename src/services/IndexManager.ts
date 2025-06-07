import * as fs from 'fs'
export interface FragmentMeta {
  index: number
  cid: string
  timestamp: number
  status: 'ok' | 'retry' | 'failed'
}

export interface IndexJson {
  videoId: string
  createdAt: number
  fragments: FragmentMeta[]
}

/**
 * IndexManager: Responsible for creating, updating and persisting the video fragment index.
 */
export default class IndexManager {
  /**
   * Creates a new index for a given video.
   * @param videoId - A unique identifier for the video.
   * @param fragments - An array of fragment metadata.
   * @returns A new IndexJson object.
   */
  createIndex(videoId: string, fragments: FragmentMeta[]): IndexJson {
    return {
      videoId,
      createdAt: Date.now(),
      fragments,
    }
  }

  /**
   * Updates the status of a specific fragment in the index.
   * @param indexJson - The current index JSON object.
   * @param fragmentIndex - The index of the fragment to update.
   * @param status - The new status for the fragment.
   * @returns A new IndexJson object with the updated fragment.
   */
  updateFragmentStatus(
    indexJson: IndexJson,
    fragmentIndex: number,
    status: 'ok' | 'retry' | 'failed',
  ): IndexJson {
    const updatedFragments = indexJson.fragments.map((fragment) =>
      fragment.index === fragmentIndex ? { ...fragment, status } : fragment,
    )

    return {
      ...indexJson,
      fragments: updatedFragments,
    }
  }

  /**
   * Saves the index JSON to a file on disk.
   * @param path - File path where the index should be written.
   * @param indexJson - The index object to be saved.
   */
  saveToFile(path: string, indexJson: IndexJson): void {
    fs.writeFileSync(path, JSON.stringify(indexJson, null, 2))
  }

  /**
   * Loads an index JSON object from a file.
   * @param path - File path to read the index from.
   * @returns The parsed IndexJson object.
   */
  loadFromFile(path: string): IndexJson {
    const data = fs.readFileSync(path, 'utf-8')
    return JSON.parse(data)
  }
}
