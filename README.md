# CDRI 도서 검색 프로젝트

## 프로젝트 개요

카카오 다음 검색 API를 활용한 웹 기반 도서 검색 애플리케이션입니다. 사용자는 도서를 검색하고, 상세 정보를 확인하며, 관심 있는 도서를 북마크할 수 있습니다.

### 주요 기능

- **도서 검색**: 제목, 저자명, 출판사별 검색 지원
- **검색 기록**: 최근 검색어 자동 저장 및 빠른 재검색
- **상세 검색**: 다양한 검색 옵션과 필터링
- **북마크**: 관심 도서 저장 및 관리
- **페이지네이션**: 대량 검색 결과 효율적 표시

## 실행 방법 및 환경 설정

### 사전 요구사항

- Node.js (v18 이상)
- pnpm 패키지 매니저

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작 (포트 5173로 실행)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작 (포트 3000으로 실행)
pnpm start
```

### 환경 변수 설정

`.env` 파일에 카카오 REST API 키를 설정해야 합니다:

```
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
```

## 폴더 구조 및 주요 코드 설명

```
cdri-books-kimkwansik/
├── app/
│   ├── components/ui/          # 재사용 가능한 UI 컴포넌트
│   ├── domains/                # 페이지별 컴포넌트
│   │   ├── common/               # 공통 컴포넌트 (Header 등)
│   │   ├── home/                 # 홈페이지 관련 컴포넌트
│   │   └── my/                   # 마이페이지 관련 컴포넌트
│   ├── lib/                    # 유틸리티 함수
│   ├── routes/                 # 라우팅 컴포넌트
│   │   ├── home.tsx              # 홈페이지 (도서 검색)
│   │   └── my/                   # 마이페이지 (북마크)
│   ├── shared/                 # 공유
│   │   ├── service/              # API 서비스
│   │   ├── hooks/                # 커스텀 훅
│   │   ├── ui/                   # 공유 UI 컴포넌트
│   │   └── func/                 # 유틸리티 함수
│   ├── root.tsx                # 루트 컴포넌트
│   └── routes.ts               # 라우팅 설정
├── public/                     # 정적 파일
└── ...                         # 설정 파일들
```

### 핵심 코드 설명

#### API 서비스 계층 (`app/shared/service/`)

- **base-factory.ts**: API 클라이언트의 기반 기능을 제공하는 팩토리 패턴 구현의 추상 클래스
  - 모든 API 서비스 클래스가 상속받아 사용하는 공통 기반
- **search/apis.ts**: 카카오 도서 검색 API 연동
  - 서비스별 설정
  - 엔드포인트 관리
- **search/hooks.ts**: React Query 훅을 통한 데이터 fetching
- **search/query.ts**: React Query 쿼리 키 정의

#### 도서 아이템 (`app/shared/ui/book-item.tsx`)

- 도서 정보 표시 및 상세 정보 포함
- 상세 정보를 Accordion이 아닌 Collapse 컴포넌트를 사용해서 개별적으로 열고 닫을 수 있도록 구현

#### 북마크 Context (`app/shared/context/bookmark-context.tsx`)

- **전역 상태 관리**: React Context API로 북마크 상태 전역 관리
- **로컬 스토리지 연동**: `BookmarkProvider`가 자동으로 로컬 스토리지 동기화
- **실시간 상태 공유**: 여러 컴포넌트에서 북마크 상태 실시간 접근
- **타입 안전성**: TypeScript로 타입이 정의된 Context 인터페이스

## 라이브러리 선택 이유

### 상태 관리 및 데이터 fetching

- **@tanstack/react-query**: 서버 상태 관리, 캐싱, 리프레시 등 최적화된 데이터 fetching
- **@lukemorales/query-key-factory**: React Query 키 관리 자동화

### UI 및 스타일링

- **Tailwind CSS v4**: 유틸리티 기반 스타일링으로 빠른 개발
- **Radix UI**: Headless UI 기반의 라이브러리로 필수 기능을 포함하고 있어 디자인만 빠르게 적용해서 사용이 가능

### 개발 도구

- **vite-plugin-svgr**: SVG 파일 React 컴포넌트로 변환

<br />

## 강조하고 싶은 기능

### 1. 사용자 경험 최적화

- **검색 상태 유지**: 페이지 새로고침 시 검색 조건 유지

### 2. 성능 최적화

- **이미지 최적화**: 이미지 최적화를 위해 `getImageTransformation` 함수로 이미지 리사이징
  - 현재 제공받는 이미지 url은 CDN을 통해 제공되지 않는 url이라 리사이징이 적용안됨.
  - 하지만 향후 CDN이나 이미지 최적화 서비스 도입 시 확장성 고려한 구조
- **컴포넌트 분리**: 작은 단위로 나누지 않고 기능 단위로 컴포넌트 분리

### 3. 북마크 시스템

- **실시간 동기화**: 여러 컴포넌트 간 북마크 상태 실시간 공유

### 4. 타입

- **API 응답 타이핑**: 카카오 API 응답 구조 정확한 타입 정의
