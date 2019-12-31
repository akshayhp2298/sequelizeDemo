import supertest from 'supertest'
import app from '../../server'
const request = supertest.agent(app.listen())
export default request