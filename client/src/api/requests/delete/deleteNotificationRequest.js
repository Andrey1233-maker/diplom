import { notificationWithIdQueryCreator, api } from "../../";

export default async function deleteNotificationRequest(action) {
  try {
    const response = await api.delete(
      notificationWithIdQueryCreator(action.id)
    );
    return response;
  } catch (e) {
    throw new Error(`deleteNotificationRequest: request failed ~ ${e}`);
  }
}
