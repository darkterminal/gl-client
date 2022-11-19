const axios = require('axios');

class GLClient extends  {
    constructor(token, projectId, endpoint = 'https://gitlab.com/api/v4/') {
        this.token = token
        this.projectId = projectId
        this.endpoint = endpoint
        this._setupIntrospect()
    }
    _setupIntrospect() {
        axios.defaults.baseURL = this.endpoint
        axios.defaults.headers.common['PRIVATE-TOKEN'] = this.token
        axios.defaults.headers.post['Content-Type'] = 'application/json'
    }async function checkFileExists(file_path, branch = 'master') {
    // https://gitlab.com/api/v4/projects/41197155/repository/files/README.md?ref=master
    try {
        const filePath = encodeURIComponent(file_path)
        const response = await axios.get(`${this.endpoint}projects/${this.projectId}/repository/files/${filePath}?ref=${branch}`)
        const data = response.data
        return {
            code: response.status,
            message: 'File ' + file_path + ' found!',
            data: data
        }
    } catch (error) {
        return {
            code: error.response.status,
            message: 'File ' + file_path + ' not found!'
        }
    }
}

}
module.exports = GLClient
