# MAP컨설팅 운영 연결 가이드

## 1. 문의 알림 구조

- 사이트 문의는 `/api/inquiries`로 들어옵니다.
- 운영 기준:
  - 1차 접수: `Resend` 이메일
  - 수신 메일: `mediasset1@gmail.com`
- 문의 데이터는 장기 저장을 전제로 두지 않습니다.
- 문의 확인 및 회신 후에는 별도 보관하지 않는 운영을 기준으로 합니다.

## 2. 필요한 환경 변수

`.env.local` 파일을 만들고 아래 값을 넣습니다.

```env
RESEND_API_KEY=
INQUIRY_NOTIFY_FROM=no-reply@mediasset.kr
INQUIRY_NOTIFY_TO=mediasset1@gmail.com
```

## 3. Resend 준비

1. `mediasset.kr` 도메인을 Resend에 추가합니다.
2. DNS 인증을 완료합니다.
3. 발신 주소를 정합니다.
   - 추천: `no-reply@mediasset.kr`
4. API Key를 발급받아 `RESEND_API_KEY`에 넣습니다.

## 4. 확인 방법

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

- `mediasset1@gmail.com`으로 메일이 오는지
- 문의 접수 후 24시간 이내 연락하는 흐름으로 운영 가능한지
- 개인정보처리방침 문구와 실제 폼 필드가 일치하는지

## 5. 현재 구현 범위

- 홈, 브리핑, 브리핑 상세, 문의 폼 연결 완료
- 문의 prefill 연결 완료
- 모바일 하단 고정 상담 바 완료
- 개인정보처리방침 페이지 추가
- 사이트 내부 관리자 화면은 만들지 않음
