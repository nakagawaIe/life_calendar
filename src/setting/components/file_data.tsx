import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { PAGE_TITLE, SETTING } from '../../_common/strings';
import style from './file_data.module.scss';
import { CALENDAR_ACTION_TYPE, ICalendar } from '../../calendar/reducer/calendar_reducer'
import { SETTING_ACTION_TYPE, ISettingsWork } from '../reducer/setting_reducer'

const FileData = () => {
  const exportData = useSelector((state) => state);
  const createJson = () => {
    const json = JSON.stringify(exportData)
    const blob = new Blob([json], { type: 'application/json' });
    return URL.createObjectURL(blob);
  }

  const fileGet = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.addEventListener('load', () => {
      const parse = JSON.parse(reader.result as string);
      const { calendars } = parse.calendar;
      const { work } = parse.setting;
      importCalendar(calendars);
      importSetting(work);
    })
  }

  const dispatch = useDispatch();
  const importCalendar = (calendars: ICalendar[]) => {
    dispatch({
      type: CALENDAR_ACTION_TYPE.CALENDAR_IMPORT,
      calendars,
    })
  };
  const importSetting = (work: ISettingsWork) => {
    dispatch({
      type: SETTING_ACTION_TYPE.SETTING_IMPORT,
      work,
    })
  };

  return (
    <dl className={style.root}>
      <dt>{SETTING.EXPORT}</dt>
      <dd>
        <a href={createJson()} download={`${PAGE_TITLE}_export_data_${new Date().getTime()}.json`} className={style.export}>
          {SETTING.DOWNLOAD}
        </a>
      </dd>
      <dt>{SETTING.IMPORT}</dt>
      <dd><input type="file" onChange={fileGet} className={style.inport} /></dd>
    </dl>
  )
}

export default FileData;
