### 개요

- 사용자가 에이펙스 레전드의 현재 제작 로테이션과 현재 맵 로테이션을 직관적으로 파악할 수 있는 앱

### 필수로 구현해볼 기능

- 제작 아이템 확인
  - 사용자는 현재 일간/주간 제작 아이템을 확인할 수 있어야 함
    - 아이콘, 희귀도, 한국어 이름, 제작 비용을 알기 쉽게 표시
- 맵 로테이션 확인
  - 사용자는 현재 일반 게임의 맵을 확인할 수 있어야 함

### 추가로 구현해볼 수 있는 기능

- 맵 로테이션 타이머
  - 해당 맵 로테이션이 변경되기까지의 시간을 실시간으로 보여주기
- 이전 상태 유지
  - 사용자가 다시 접속했을 때 마지막으로 종료하기 전에 받아왔던 요청 응답이 유지되어야 함

### API

- [https://apex-legends-api-wrapper.hw0k.workers.dev/crafting](https://apex-legends-api-wrapper.hw0k.workers.dev/crafting)
  - 제작 아이템
- [https://apex-legends-api-wrapper.hw0k.workers.dev/map](https://apex-legends-api-wrapper.hw0k.workers.dev/map)
  - 맵 로테이션
