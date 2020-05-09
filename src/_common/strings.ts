export const PAGE_TITLE = 'Life Calendar';

export enum CALENDAR {
  WORK = '勤務',
  FREE = '自由記入',
  PLAN = '予定',
  UNTI = 'うんち',
  MENST = '生理',
  EVENT = 'イベント',
  MEMO = 'メモなど',
}

export enum PERIOD {
  START = '開始日',
  STOP = '終了日',
  DIFF = '日数',
}

export enum SETTING {
  WORK_HEAD = '勤務タグのテキストを変更する',
  WORK_READ = '6つまで自由に設定できます。',
  FILE_HEAD = 'データを引き継ぐ',
  FILE_READ = 'データを引き継ぐ時にデータをエクスポートし、新しい端末でインポートしてください。'
}