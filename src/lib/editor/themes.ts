export const vscodeDarkTheme = {
  background: '#1E1E1E',
  foreground: '#D4D4D4',
  cursor: '#AEAFAD',
  lineHighlight: '#2F3337',
  selection: '#264F78',
  inactiveSelection: '#3A3D41',
  // 타이핑 상태별 색상
  correct: '#4EC9B0',     // 올바르게 입력된 텍스트
  incorrect: '#F14C4C',   // 잘못 입력된 텍스트
  current: '#569CD6',     // 현재 입력해야 할 텍스트
  upcoming: '#D4D4D4',    // 아직 입력하지 않은 텍스트
  syntax: {
    keyword: '#569CD6',    // if, const, function
    string: '#CE9178',     // 문자열
    number: '#B5CEA8',     // 숫자
    comment: '#6A9955',    // 주석
    function: '#c7c71a',   // 함수명
    type: '#4EC9B0',       // 타입
    variable: '#9CDCFE',   // 변수
    property: '#9CDCFE',   // 객체 속성
    operator: '#C586C0',    // 연산자
    plain: '#D4D4D4'    // plain 타입 추가
  },
  typing: {
    incorrect: {
      background: '#ff000020',
      border: '#ff0000',
      text: '#ff6b6b'
    },
    completed: {
      background: '#4EC9B010'
    }
  },
  lineNumber: '#858585',
  lineNumberActive: '#C6C6C6'
}; 