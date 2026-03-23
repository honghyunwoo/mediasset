import {
  buildInquiryPayload,
  persistNotificationStatus,
  saveInquiry,
  sendInquiryNotification,
  validateInquiryPayload,
} from "@/lib/inquiry-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = buildInquiryPayload(body);
    const validationError = validateInquiryPayload(payload);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const storageResult = await saveInquiry(payload);
    let notificationStatus = "pending";

    try {
      const notificationResult = await sendInquiryNotification(payload);
      notificationStatus = notificationResult.status;
    } catch {
      notificationStatus = "failed";
    }

    await persistNotificationStatus(storageResult, notificationStatus);

    return Response.json({
      ok: true,
      reference: payload.reference,
      notificationStatus,
    });
  } catch (error) {
    console.error("Failed to process inquiry", error);
    return Response.json(
      { error: "상담 문의를 저장하는 중 문제가 발생했습니다." },
      { status: 500 },
    );
  }
}
