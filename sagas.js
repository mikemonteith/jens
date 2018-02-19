
import openDialog from './app/containers/OpenDialog/sagas'

export default function* () {
  yield [
    openDialog(),
  ]
}
