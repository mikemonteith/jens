
import { take, call, put, takeEvery, select } from 'redux-saga/effects'

import * as constants from './constants'

function* update () {

}

export default function* () {
  yield takeEvery(constants.UPDATE, update)
}
