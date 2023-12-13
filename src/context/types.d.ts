export interface Notification {
  loader: number;
  user_name: string;
  cuit: number;
  notification_type: string;
  amount: number;
  notification_url: string;
  notification_id: number;
  status: string;
  date: Date;
  fecha: string;
  user_notif: string;
  reason?: string;
  notification_date: Date;
  notification_upload_date: Date;
  rejected_reason?: string;
}
