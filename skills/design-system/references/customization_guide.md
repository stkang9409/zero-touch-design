# 커스터마이징 가이드 (Overridable Axes vs Locked Invariants)

`zero-touch-design`은 **기본 프리셋을 프로젝트에 맞게 유연하게 바꿀 수 있도록** 설계되었다. 단, 커스터마이징이 품질 저하로 이어지지 않도록 **열어 둔 축**과 **잠근 하한선**을 명확히 나눈다.

## 1. 자유롭게 커스터마이징하는 6가지 축 (Overridable Axes)

| 축 | 기본값 (Default Preset) | 커스터마이징 방법 |
|---|---|---|
| **1. 브랜드 강조색 (`brand`)** | Royal Indigo `#254EDB` / `#1D3EB8` / `#EBF0FF` | `tokens.json`의 `brand`, `brandDeep`, `brandSoft`, `brandSoftBorder`, `brandInk` 5개 키를 교체하고 `rgb` 트리플릿을 맞춘다. |
| **2. 테마 극성 (Light ↔ Dark)** | Light (`#F8FAFC` 바탕) + 부분 Dark 블록 | 다크 중심 서비스라면 `canvas` `#0B0F17` · `mist` `#131A26` · `raised` `#1E2636`으로 치환하고 `fg`~`fg-4` 밝기를 반전한다. (예: 데스크톱 운영·어드민 대시보드는 다크+오렌지 계열 오버라이드 가능) |
| **3. 서체 (`typography`)** | `Pretendard` + `Space Grotesk` | `fontSans` / `fontDisplay` 및 배열을 교체한다. 단, 숫자 정렬용 `tabular-nums`와 iOS 입력 최소 `16px`은 유지한다. |
| **4. 반경 · 그림자 (`radius` · `shadow`)** | `28 / 24 / 16 / 12 / 8 / 9999px` | 브랜드 성격이 각진 B2B라면 `hero: 16px, card: 12px, control: 8px`처럼 단계 비율을 유지한 채 축소한다. |
| **5. 문체 · 톤 (`copy register`)** | 한국어 해요체 | 전문 B2B·약관·영문 UI라면 프로젝트 가이드에서 기본 문체를 `합니다체` 또는 `English Concise`로 오버라이드한다. 단, 한 흐름 내 혼용은 금지한다. |
| **6. 도메인 컴포넌트** | 3화면 틀 + 기본 부품 | 프로젝트 전용 컴포넌트(`Player`, `Chart`, `Canvas` 등)를 추가할 때는 동일한 토큰 변수와 `strokeWidth`를 상속한다. |

## 2. 절대 바꿀 수 없는 불변 가드레일 (Locked Invariants)

아래 7가지는 어떤 브랜드·테마로 커스터마이징해도 예외 없이 지킨다.

1. **SSOT 단일 토큰 원본**: 색·서체·반경은 반드시 1개 토큰 파일(`tokens.json` 등)에서 내려받고 코드에 임의 HEX나 원색 팔레트를 하드코딩하지 않는다.
2. **`80-15-5` 면적 법칙**: 바탕 80% · 중립 전경 15% · 브랜드 강조 5% 비율을 지킨다. 강조색을 바꿨다고 화면 곳곳에 채우지 않는다.
3. **WCAG AA 명도 대비**: 색상을 바꿀 때마다 본문 `>= 4.5:1`, 큰 제목·비텍스트 컨트롤 `>= 3.0:1` 대비를 수학적으로 재계산해 검증한다.
4. **터치 표적 `>= 44×44px`**: 모든 버튼·링크·칩·닫기·아이콘 버튼의 클릭 영역은 최소 44px 이상이다.
5. **뷰포트당 주 버튼(`PrimaryButton`) 최대 1개**: 강조 채움 버튼은 한 화면에 오직 1개만 둔다.
6. **금지 UI·모션·표기 0건**: 제목 위 눈썹(`.eyebrow`), 비대화형 장식 알약, 비순서 `01`/`02` 장식 번호, `transition-all`, 엠대시(`—`), `<br><em>` 제목 분할을 쓰지 않는다.
7. **Gate 0 · 백지 비평 절차**: `design-gate` 스킬의 Gate 0 심사, 대표 1조각 선검증, 실캡처 백지 비평을 건너뛰지 않는다.

## 3. 빠른 오버라이드 레시피

### 예시: "이 프로젝트는 다크 + 에메랄드(`#10B981`) 브랜드로 가자"
1. `tokens.json`에서 `meta.theme`을 `"Midnight & Emerald"`로, `meta.customized`를 `true`로 설정한다.
2. `canvas`=`#0B1220`, `mist`=`#131C2E`, `raised`=`#1A2438`, `fg`=`#F8FAFC`~`fg4`=`#94A3B8`로 극성을 반전한다.
3. `brand`는 어두운 배경 위 흰 글자(`brand-950: #042F2E` 또는 `brandInk: #34D399`) 대비가 **4.5:1 이상** 나오도록 명도를 조정해 넣는다.
4. `design-gate.test.template.ts`의 검사 대상 토큰 파일과 소스 경로만 프로젝트에 맞게 연결하고 `npm test`로 SSOT 일치를 잠근다.
