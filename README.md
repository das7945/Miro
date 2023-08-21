# Miro Camp

MiroCamp는 Node.js, MongoDB, Express를 사용하여 만든 RESTful 웹앱입니다.

**모든 캠핑장은 무작위로 생성되며 데이터는 가짜(임의로 생성됨)입니다.**

MiroCamp를 통해 사용자는 다음과 같은 경험을 할 수 있습니다.

- 캠핑장 검색
- 이메일 주소로 가입
- 캠핑장 등록
- 캠핑장 순위
- 캠핑장에 대한 의견

![Image 1](https://res.cloudinary.com/dxk1akbrt/image/upload/v1692643596/Miro/k67y8cbr3zxmd3jadvjf.png)

**웹 링크:** 대기중...

## 스택 및 기능

**스택:** NodeJS, Express, MongoDB

**Features:**

- Express 및 mongoose를 사용한 RestFUL 라우팅
- Passport.js를 사용한 인증(Local)
- cloudinary를 통한 이미지 저장
- 캠핑장 위치를 보여주는 MapBox
- Heroku 배포
- 템플릿용 EJS
- Bootstrap을 이용한 반응형 디자인

## 특징

- 사용자는 캠핑장을 등록, 편집 및 제거할 수 있습니다.
- 사용자는 캠핑장을 리뷰하고 리뷰를 수정하거나 삭제할 수 있습니다.

<!-- bcrypt와 bcryptjs 패키지 설치 시 주의할점.

- bcrypt는

  - 브라우저에서는 실행되지 않음.
  - Node를 대상으로 서버에서 사용.
  - C++구현되었으며 속도가 더 빠름

- bcryptjs
- 자바스트립트로 제작됨.
- 클라이언트에서도 사용가능 (서버도 가능)

현재 프로젝트에서는 bcryptjs를 사용~! -->
