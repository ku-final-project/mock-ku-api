export interface Config {
  baseUrlAPI: string;
  eventId: string;
  token: string;
}
export interface Picture {
  pic: string;
  face_id: string;
}
export interface Env {
  MY_BUCKET: R2Bucket;
  SHARED_API_KEY: string;
}
