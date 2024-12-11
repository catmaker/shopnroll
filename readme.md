# ShopNRoll Project

ShopNRoll은 Next.js를 기반으로 한 현대적인 이커머스 플랫폼입니다. 관리자 대시보드와 사용자 스토어로 구성되어 있습니다.

## 데모 영상

### 관리자 페이지 데모
[![관리자 페이지 데모 영상](https://img.youtube.com/vi/g8vYV1WreHM/maxresdefault.jpg)](https://youtu.be/g8vYV1WreHM)

### 스토어 페이지 데모
[![스토어 페이지 데모 영상](https://img.youtube.com/vi/qA-UMHkbBus/maxresdefault.jpg)](https://youtu.be/qA-UMHkbBus)


## 프로젝트 구조

### 전체 구조

```
shopnroll-project/
├── shopnroll-admin/    # 관리자 대시보드
└── shopnroll-store/    # 사용자 스토어 프론트엔드
```

### 컴포넌트 특징

1. **모듈화된 구조**

   - 각 컴포넌트는 독립적인 기능 단위로 구성
   - 재사용 가능한 UI 컴포넌트 분리

2. **상태 관리**

   - 장바구니 및 위시리스트 상태 관리
   - 모달 및 드롭다운 상태 처리

3. **사용자 경험**
   - 반응형 디자인
   - 직관적인 네비게이션
   - 상품 미리보기 기능

### 컴포넌트 설계 원칙

1. **재사용성**

   - 모든 Atom 컴포넌트는 독립적으로 동작
   - Props를 통한 유연한 커스터마이징

2. **일관성**

   - 디자인 토큰 시스템 사용
   - 공통 스타일 가이드 준수

3. **접근성**

   - ARIA 레이블 적용
   - 키보드 네비게이션 지원

4. **성능**
   - 컴포넌트 lazy loading
   - 최적화된 렌더링

### 컴포넌트 구조 및 사용자 상호작용

#### 메인 스토어 (사용자 인터페이스)

```
📱 StorePage
├── 🏠 Header
│   ├── Logo
│   ├── Navigation
│   │   ├── [클릭] 카테고리 메뉴
│   │   ├── [클릭] 검색
│   │   └── [클릭] 장바구니
│   └── UserMenu
│       ├── [클릭] 로그인/회원가입
│       └── [클릭] 마이페이지
│
├── 🛍️ ProductGrid
│   ├── FilterSection
│   │   ├── [선택] 카테고리 필터
│   │   ├── [선택] 가격 범위
│   │   └── [선택] 정렬 옵션
│   │
│   └── ProductCard
│       ├── [호버] 상품 상세 정보
│       ├── [클릭] 상품 상세 페이지
│       └── [클릭] 장바구니 담기
│
└── 🛒 Cart
    ├── CartItem
    │   ├── [입력] 수량 조절
    │   └── [클릭] 삭제
    └── Checkout
        └── [클릭] 결제하기
```

#### 관리자 대시보드

```
📊 DashboardPage
├── 📈 Statistics
│   ├── SalesChart
│   │   └── [호버] 상세 데이터
│   └── AnalyticsSummary
│
├── 📦 ProductManagement
│   ├── ProductList
│   │   ├── [클릭] 상품 추가
│   │   ├── [클릭] 상품 수정
│   │   └── [클릭] 상품 삭제
│   │
│   └── CategoryManagement
│       ├── [입력] 카테고리 추가
│       └── [클릭] 카테고리 수정
│
└── 📋 OrderManagement
    ├── OrderList
    │   ├── [필터] 주문 상태
    │   └── [클릭] 주문 상세
    │
    └── OrderDetail
        └── [선택] 주문 상태 변경
```

### 컴포넌트 구조 (shopnroll-store)

#### 🛍️ 상품 관련 컴포넌트

```
components/
├── gallery/           # 상품 이미지 갤러리 관리
│   ├── gallery-tab    # 갤러리 탭 컴포넌트
│   └── index         # 갤러리 메인 컴포넌트
├── info.tsx          # 상품 상세 정보
├── product-list.tsx  # 상품 목록 표시
├── product-actions.tsx # 상품 관련 액션 (장바구니 추가 등)
└── preview-modal.tsx  # 상품 미리보기 모달
```

#### 🛒 장바구니 시스템

```
components/
├── cart-list.tsx     # 장바구니 상품 목록
├── cart-summary.tsx  # 장바구니 요약 정보
└── wishlist-list.tsx # 위시리스트 관리
```

#### 🎯 네비게이션

```
components/
├── navbar.tsx        # 상단 네비게이션 바
├── main-nav.tsx      # 메인 네비게이션 메뉴
└── nav-actions.tsx   # 네비게이션 액션 버튼
```

#### 🏪 스토어 UI

```
components/
├── billboard.tsx     # 메인 배너/광고판
├── brand-message.tsx # 브랜드 메시지 표시
├── browse-categories.tsx # 카테고리 브라우징
└── footer.tsx       # 푸터 컴포넌트
```

#### ⚡ UI 기본 요소 (components/ui)

```
ui/
├── button.tsx       # 기본 버튼
├── icon-button.tsx  # 아이콘 버튼
├── container.tsx    # 레이아웃 컨테이너
├── currency.tsx     # 가격 표시 포맷
├── modal.tsx        # 모달 창
├── dropdown-menu.tsx # 드롭다운 메뉴
├── navigation-menu.tsx # 네비게이션 메뉴
├── no-results.tsx   # 결과 없음 표시
├── product-card.tsx # 상품 카드 컴포넌트
└── sub-category.tsx # 서브 카테고리 표시
```

### 컴포넌트 구조 (shopnroll-admin)

#### 📊 대시보드 UI 컴포넌트

```
components/
├── main-nav.tsx      # 메인 네비게이션
├── nav.tsx           # 네비게이션 바
├── store-switcher.tsx # 스토어 전환기
└── modals/           # 모달 컴포넌트
```

#### ⚡ UI 기본 요소 (components/ui)

```
ui/
├── alert.tsx         # 경고 메시지
├── api-alert.tsx     # API 경고 메시지
├── api-list.tsx      # API 목록
├── badge.tsx         # 배지 컴포넌트
├── button.tsx        # 버튼
├── card.tsx          # 카드 레이아웃
├── checkbox.tsx      # 체크박스
├── command.tsx       # 명령어 입력
├── data-table.tsx    # 데이터 테이블
├── dialog.tsx        # 대화 상자
├── dropdown-menu.tsx # 드롭다운 메뉴
├── form.tsx          # 폼 컴포넌트
├── heading.tsx       # 헤딩 스타일
├── image-upload.tsx  # 이미지 업로드
├── input.tsx         # 입력 필드
├── label.tsx         # 라벨
├── modal.tsx         # 모달 창
├── popover.tsx       # 팝오버
├── select.tsx        # 선택 필드
├── separator.tsx     # 구분선
├── table.tsx         # 테이블
└── tooltip.tsx       # 툴팁
```

### 관리자 대시보드 구조

```
shopnroll-admin/
├── app/
│   ├── (auth)/         # 인증 관련 페이지
│   ├── (dashboard)/    # 대시보드 페이지
│   ├── (root)/         # 루트 레이아웃
│   └── api/           # API 엔드포인트
├── components/
│   ├── ui/            # UI 컴포넌트
│   └── modals/        # 모달 컴포넌트
├── hooks/             # 커스텀 훅
├── lib/               # 유틸리티 함수
├── prisma/            # 데이터베이스 스키마
└── public/            # 정적 파일
```

### 사용자 스토어 구조

```
shopnroll-store/
├── app/
│   ├── (routes)/      # 페이지 컴포넌트
│   └── layout.tsx     # 레이아웃
├── components/
│   ├── ui/           # UI 컴포넌트
│   ├── Calendar/     # 캘린더 관련 컴포넌트
│   └── Charts/       # 차트 컴포넌트
├── hooks/            # 커스텀 훅
├── utils/            # 유틸리티 함수
├── styles/           # 전역 스타일
├── types/            # TypeScript 타입 정의
└── public/           # 정적 파일
```

## 주요 기능

### 관리자 대시보드 (shopnroll-admin)

- 사용자 인증 및 권한 관리 (Clerk)
- 상품 관리
  - 상품 등록, 수정, 삭제
  - 카테고리 관리
  - 재고 관리
- 주문 관리
  - 주문 상태 관리
  - 배송 정보 관리
- API 엔드포인트 제공
- 대시보드 통계 및 분석

### 사용자 스토어 (shopnroll-store)

- 상품 탐색 및 검색
- 카테고리별 상품 필터링
- 장바구니 기능
  - 상품 추가/삭제
  - 수량 조절
- 주문 프로세스
- 반응형 디자인

## 기술 스택

### 공통

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Axios

### 관리자 대시보드 (shopnroll-admin)

- Clerk (인증)
- Prisma (데이터베이스 ORM)
- React Hook Form
- Radix UI (UI 컴포넌트)
- Tanstack Table
- date-fns

### 사용자 스토어 (shopnroll-store)

- Headless UI
- Radix UI
- Zustand (상태 관리)
- React Hot Toast

## 전역 상태 관리 (shopnroll-store)

`shopnroll-store`에서는 `Zustand` 라이브러리를 사용하여 전역 상태를 관리합니다. 주요 내용은 다음과 같습니다:

- **라이브러리**: `Zustand`를 사용하여 상태 관리
- **상태 저장소**: `localStorage`를 이용하여 상태를 지속적으로 저장
- **주요 기능**:
  - **장바구니 관리**: 상품 추가, 제거, 전체 삭제 기능
  - **상태 유지**: 브라우저를 닫아도 상태가 유지되도록 `persist` 미들웨어 사용
  - **만료 체크**: 추가된 상품의 만료 여부를 확인하는 기능
