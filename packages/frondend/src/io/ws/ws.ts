import logger from '@/utils/logger'
import { storage } from '@/utils/storage/storage'
import { Socket, io } from '@hyoga/uni-socket.io'

interface EventItem {
  event: string
  data: unknown
}

class LongChain {
  private isConnected: boolean = false

  private eventQueue: EventItem[] = []

  connection: Socket | null = null

  constructor(private url: string, private path: string) {}

  connect() {
    const { url, path } = this
    this.connection = io(url, {
      path: path,
      query: {
        session: storage.get('session'),
      },
      extraHeaders: {
        session: 'token',
      },
      transports: ['websocket', 'polling'],
      timeout: 5000,
    })

    this.connection.on('connect', () => {
      if (!this.connection) return

      const { id } = this.connection

      logger.info('Socket链接成功', id)
      this.isConnected = true
      this.emit('hello', {
        name: 'zs',
      })
    })
    //监听断线
    this.connection.on('error', (msg: any) => {
      logger.info('Socket链接失败', msg)
    })
  }

  on(event: string, callBack: (...args: any[]) => void) {
    this.connection?.on(event, callBack)
  }

  off(event: string, callBack: (...args: any[]) => void) {
    this.connection?.off(event, callBack)
  }

  emit(event: string, data: unknown) {
    const { connection } = this
    if (!this.isConnected || !connection) {
      this.eventQueue.push({
        event,
        data,
      })
      return
    }
    this.eventQueue.forEach(({ event, data }) => {
      connection.emit(event, data)
    })
    connection.emit(event, data)
  }
}

export const longChain = new LongChain(
  import.meta.env.VITE_WS_COMMON_URL,
  import.meta.env.VITE_WS_COMMON_PATH
)
