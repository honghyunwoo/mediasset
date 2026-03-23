# MAP컨설팅 배포 순서

## 현재 상태

- 사이트는 Next.js 프로젝트로 동작합니다.
- `npm run lint`, `npm run build` 기준으로 배포 가능한 상태입니다.
- 문의 저장은 아직 로컬 파일 기반 개발 모드입니다.
- 현재 `home` 폴더에는 GitHub 원격 저장소가 없습니다.
- 상위 `C:\Users\hynoo`가 Git 루트로 잡혀 있어서, 배포 전에는 `home` 폴더를 독립 저장소로 분리하는 편이 안전합니다.

## 권장 배포 방식

- 1차 공개: `GitHub + Vercel + mediasset.kr`
- 문의 운영: `Google Sheets + 운영 메일 + Resend`

## 순서

### 1. 프로젝트를 독립 Git 저장소로 정리

- 목표:
  - `C:\Users\hynoo\OneDrive\바탕 화면\home`만 따로 GitHub에 올릴 수 있게 만들기
- 지금 해둔 것:
  - `.gitignore`에 `node_modules`, `.next`, 로컬 문의 파일, 임시 로그를 추가해 둠
- 다음 액션:
  - `home` 폴더를 별도 Git 저장소로 초기화
  - 첫 커밋 생성

### 2. GitHub 저장소 생성

- 사용자 필요:
  - GitHub 계정 로그인
  - 새 저장소 이름 결정
- 추천 저장소 이름:
  - `mediasset-kr`
  - `map-consulting-site`

### 3. Vercel 첫 배포

- 사용자 필요:
  - Vercel 로그인
  - GitHub 저장소 연결
- 진행 내용:
  - 저장소 import
  - Next.js 프로젝트로 자동 배포
  - 배포 URL 발급

### 4. 도메인 연결

- 사용자 필요:
  - 도메인을 구매한 곳의 DNS 관리 화면 접속
- 진행 내용:
  - `mediasset.kr`를 Vercel 프로젝트에 연결
  - Vercel이 안내하는 DNS 레코드 입력
  - HTTPS 확인

### 5. 문의 저장 외부화

- 중요:
  - 배포 후에는 현재 PC 로컬 파일 저장 방식에 의존하면 안 됨
- 필요한 것:
  - Google Sheets
  - 서비스 계정
  - 운영 메일 주소
  - Resend API Key
- 관련 문서:
  - `README-OPERATIONS.md`

### 6. 최종 운영 점검

- 체크 항목:
  - 외부 네트워크에서 사이트 접속
  - 문의 접수
  - Google Sheets 저장
  - 메일 알림
  - 모바일 확인

## 내가 바로 할 수 있는 것

- `home` 폴더를 독립 Git 저장소로 정리
- 첫 커밋 준비
- GitHub 연결 명령 정리
- Vercel 배포 전 점검
- DNS 입력값 정리

## 사용자가 직접 해야 하는 것

- GitHub 로그인
- Vercel 로그인
- 도메인 DNS 화면 접속
- 운영 메일 생성
- Google 계정 / Google Sheets API 설정
