import { fileSelect } from '../utils/fileSelect';
import { putObject } from '../utils/upload';

@Entry
@Component
struct Index {
  build() {
    Row() {
      Column() {
        Button(){
          Text('Upload File').fontSize('30').fontColor('white')
        }.margin({
          top: 30
        })
        .height('5%')
        .width('50%')
        .onClick(() => {
          console.info('onClick');
          const context = getContext(this);

          fileSelect(context).then(fileSelectResult => {
            Promise.allSettled(fileSelectResult.map((item) => {
              return putObject(item);
            })).then(res => {
              const failedJobs = res.filter(v => v.status === 'rejected');

              if (failedJobs.length > 0) {
                console.info('Failed objects: ' + failedJobs.length);
              } else {
                console.info('All the objects upload success');
              }
            });
          }).catch((err: object) => {
            console.info('documentViewPicker select failed:', JSON.stringify(err));
          });
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}