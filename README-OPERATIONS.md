# MAP컨설팅 운영 연결 가이드

## 1. 문의 알림 구조

- 사이트 문의는 `/api/inquiries`로 들어옵니다.
- 운영 기준:
  - 1차 저장: `Google Sheets`
  - 1차 알림: `Resend` 이메일
- 개발환경에서는 키가 없으면 로컬 파일 `data/inquiries/submissions.jsonl`로만 저장됩니다.
- 배포환경에서는 `Google Sheets` 환경 변수가 없으면 저장이 실패합니다.

## 2. 필요한 환경 변수

`.env.local` 파일을 만들고 아래 값을 넣습니다.

```env
RESEND_API_KEY=
INQUIRY_NOTIFY_FROM=no-reply@mediasset.kr
INQUIRY_NOTIFY_TO=4993357@naver.com

GOOGLE_SHEET_ID=
GOOGLE_SHEET_RANGE=Inquiries!A:M
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 3. Google Sheets 준비

1. 새 Google Spreadsheet를 만듭니다.
2. 첫 번째 시트 이름을 `Inquiries`로 맞춥니다.
3. 첫 줄 헤더를 아래 순서로 넣습니다.

```text
submittedAt | reference | status | name | clientType | organizationName | phone | email | needType | policyStatus | referralSource | message | notificationStatus
```

4. Google Cloud에서 서비스 계정을 만듭니다.
5. Google Sheets API를 활성화합니다.
6. 해당 스프레드시트를 서비스 계정 이메일에 공유합니다.
7. 서비스 계정의 이메일과 private key를 환경 변수에 넣습니다.

## 4. Resend 준비

1. `mediasset.kr` 도메인을 Resend에 추가합니다.
2. DNS 인증을 완료합니다.
3. 발신 주소를 정합니다.
   - 추천: `no-reply@mediasset.kr`
4. API Key를 발급받아 `RESEND_API_KEY`에 넣습니다.

## 5. 확인 방법

개발 서버 실행:

```powershell
npm run dev
```

프로덕션 빌드 확인:

```powershell
npm run build
npm run start
```

문의 테스트 후 확인할 것:

- Google Sheets에 새 행이 추가되는지
- `notificationStatus`가 `sent`로 들어가는지
- `4993357@naver.com`으로 메일이 오는지

## 6. 현재 구현 범위

- 홈, 브리핑, 브리핑 상세, 문의 폼 연결 완료
- 문의 prefill 연결 완료
- 모바일 하단 고정 상담 바 완료
- 사이트 내부 관리자 화면은 만들지 않음
- 상태 변경은 Google Sheets에서 직접 관리
