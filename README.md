# Miro Camp

MiroCamp는 Node.js, MongoDB, Express를 사용하여 만든 RESTful 웹앱입니다.

## 소개

MiroCamp은 야외 캠핑장 정보를 공유하고 관리하는 플랫폼으로, 사용자들은 다양한 캠핑장을 검색하고 리뷰를 작성하며, 자신이 다녀온 캠핑장을 공유할 수 있습니다. CRUD(Create, Read, Update, Delete) 형식으로 캠핑장 정보를 관리할 수 있으며, 사용자 간의 상호작용을 통해 캠핑 경험을 더욱 풍부하게 만들어줍니다.

**모든 캠핑장은 무작위로 생성되며 데이터는 가짜(임의로 생성됨)입니다.**

MiroCamp를 통해 사용자는 다음과 같은 경험을 할 수 있습니다.

- 다양한 캠핑장 상세 정보 확인
- 리뷰 작성 및 캠핑 경험 공유
- 캠핑장 등록, 수정, 삭제
- 사용자 인증 및 권한 관리
- 이미지 업로드 및 공유

![Image 1](https://res.cloudinary.com/dxk1akbrt/image/upload/v1692643596/Miro/k67y8cbr3zxmd3jadvjf.png)

**웹 링크:** https://desolate-harbor-98574-4037addd37a5.herokuapp.com/

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

<!-- bcrypt와 bcryptjs 패키지 설치 시 주의할점.

- bcrypt는

  - 브라우저에서는 실행되지 않음.
  - Node를 대상으로 서버에서 사용.
  - C++구현되었으며 속도가 더 빠름

- bcryptjs
- 자바스트립트로 제작됨.
- 클라이언트에서도 사용가능 (서버도 가능)

현재 프로젝트에서는 bcryptjs를 사용~! -->
