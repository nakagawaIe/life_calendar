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
  NUM = '何回前',
  START = '開始日',
  STOP = '終了日',
  DIFF = '周期',
  TITLE = 'あなたの周期は',
  NONE = '-',
}

export enum SETTING {
  WORK_HEAD = '勤務タグのテキストを変更する',
  WORK_READ = '6つまで自由に設定できるよ！',
  FILE_HEAD = 'データを引き継ぐ',
  FILE_READ = 'データをエクスポートし、別の端末でインポートすると、引き継ぐことができるよ！',
  EXPORT = 'エクスポート',
  IMPORT = 'インポート',
  DOWNLOAD = 'ダウンロード',
}

export enum CONTACT {
  READ = 'このアプリについてのご要望や質問、不具合などのお問い合わせはこちらからお気軽にどうぞ！',
  TITLE_OPEN = 'お問い合わせフォームを開く',
  TITLE_CLOSE = 'お問い合わせフォームを閉じる',
}