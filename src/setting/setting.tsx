import React, { useEffect } from 'react';
import style from './setting.module.scss';
import { PAGE_TITLE, SETTING } from '../_common/strings';
import SettingContainer from './components/setting_container'
import WorkSetting from './components/work_setting'
import FileData from './components/file_data'

const Setting = () => {
  useEffect(() => {
    document.title = `設定 - ${PAGE_TITLE}`;
  });

  return (
    <div className={style.root}>
      <SettingContainer head={SETTING.WORK_HEAD} read={SETTING.WORK_READ}>
        <WorkSetting />
      </SettingContainer>
      <SettingContainer head={SETTING.FILE_HEAD} read={SETTING.FILE_READ}>
        <FileData />
      </SettingContainer>
    </div>
  )
};

export default Setting;
