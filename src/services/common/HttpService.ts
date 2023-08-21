import authConfig from 'src/configs/auth'


export default class HttpService {
  ///POST
  static async post({ endpoint, body, sessionId }: { endpoint: string; body?: any; sessionId: string | null }) {
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers: HttpService.getHeaders(sessionId),
      body: JSON.stringify(body)
    })

    return response
  }
  static async postWithAuth({ endpoint, body }: { endpoint: string; body?: any }) {
    const sessionId = localStorage.getItem(authConfig.sessionIdKey)
    return await HttpService.post({ endpoint: endpoint, body: body, sessionId: sessionId })
  }
  static async postFilesWithAuth({ endpoint, body }: { endpoint: string; body?: any }) {
    const sessionId = localStorage.getItem(authConfig.sessionIdKey)
    const response = await fetch(`${endpoint}`, {
      method: 'POST',
      headers: HttpService.getHeaders(sessionId), //multipart/form-data
      body: body
    })

    return response
  }

  ///GET
  static async get({ endpoint, sessionId }: { endpoint: string; sessionId: string | null }) {
    const response = await fetch(`${endpoint}`, {
      method: 'GET',
      headers: HttpService.getHeaders(sessionId)
    })

    return response
  }
  static async getWithAuth({ endpoint }: { endpoint: string }) {
    const sessionId = localStorage.getItem(authConfig.sessionIdKey)
    return await HttpService.get({ endpoint: endpoint, sessionId: sessionId })
  }

  ///PUT
  static async put({ endpoint, body, sessionId }: { endpoint: string; body?: any; sessionId: string | null }) {
    const response = await fetch(`${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: HttpService.getHeaders(sessionId)
    })

    return response
  }
  static async putWithAuth({ endpoint, body }: { endpoint: string; body?: any }) {
    const sessionId = localStorage.getItem('sessionId')
    return await HttpService.put({ endpoint: endpoint, body: body, sessionId: sessionId })
  }

  ///DELETE
  static async delete({ endpoint, sessionId }: { endpoint: string; sessionId: string | null }) {
    const response = await fetch(`${endpoint}`, {
      method: 'DELETE',
      headers: HttpService.getHeaders(sessionId)
    })

    return response
  }

  static async deleteWithAuth({ endpoint }: { endpoint: string }) {
    const sessionId = localStorage.getItem('sessionId')
    return await HttpService.delete({ endpoint: endpoint, sessionId: sessionId })
  }

  static getHeaders(sessionId: string | null, contentType = 'application/json') {
    let headers: any = {
      'Content-Type': contentType
    }

    if (sessionId != null) {
      headers['Cmdbuild-authorization'] = sessionId
    }

    return headers
  }
}
