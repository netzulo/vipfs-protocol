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
 * IndexManager: Gestiona el índice JSON.
 */
export default class IndexManager {
  createIndex(videoId: string, fragments: FragmentMeta[]): IndexJson {
    return {
      videoId,
      createdAt: Date.now(),
      fragments,
    }
  }

  updateFragmentStatus(
    indexJson: IndexJson,
    fragmentIndex: number,
    status: 'ok' | 'retry' | 'failed',
  ): IndexJson {
    const updatedFragments = indexJson.fragments.map((f) =>
      f.index === fragmentIndex ? { ...f, status } : f,
    )
    return { ...indexJson, fragments: updatedFragments }
  }
}
