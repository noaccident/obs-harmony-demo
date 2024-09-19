import { common } from '@kit.AbilityKit';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import picker from '@ohos.file.picker';

// 选择图片
const photoSelect = async (context: common.Context) => {
  const atManager = abilityAccessCtrl.createAtManager();
  const data = await atManager.requestPermissionsFromUser(context, ["ohos.permission.READ_MEDIA"]);

  console.info("data:" + JSON.stringify(data));

  const photoSelectOptions = new picker.PhotoSelectOptions();
  const photoViewPicker = new picker.PhotoViewPicker(context);

  photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
  photoSelectOptions.maxSelectNumber = 5;

  const photoSelectResult = await photoViewPicker.select(photoSelectOptions);

  return photoSelectResult;
};

// 选择文件
const fileSelect = async (context: common.Context) => {
  const documentSelectOptions = new picker.DocumentSelectOptions();
  const documentViewPicker = new picker.DocumentViewPicker(context);

  documentSelectOptions.maxSelectNumber = 5;


  const documentSelectResult = await documentViewPicker.select(documentSelectOptions);

  return documentSelectResult;
};

export {
  photoSelect,
  fileSelect
};
