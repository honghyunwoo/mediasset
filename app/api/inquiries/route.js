import {
  buildInquiryPayload,
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

    const notificationResult = await sendInquiryNotification(payload);

    if (notificationResult.status !== "sent") {
      return Response.json(
        { error: "온라인 문의 연결이 아직 준비되지 않았습니다. 전화 또는 이메일로 문의해 주세요." },
        { status: 503 },
      );
    }

    return Response.json({
      ok: true,
      notificationStatus: notificationResult.status,
    });
  } catch (error) {
    console.error("Failed to process inquiry", error);
    return Response.json(
      { error: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
