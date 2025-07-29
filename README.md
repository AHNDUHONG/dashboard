# 📋 게시판 프로젝트

[![Java 21](https://img.shields.io/badge/Java-21-blue)](https://www.oracle.com/java/)
[![Spring Boot 3.4.5](https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen)](https://spring.io/projects/spring-boot)
[![React 19.1.0](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> 사용자들이 글을 작성·수정·삭제하고, 댓글을 달 수 있는 간단한 웹 게시판 서비스

---

## 📑 목차

1. [🚀 주요 기능](#-주요-기능)  
2. [🧰 기술 스택](#-기술-스택)  
3. [⚙️ 설치 및 실행](#️-설치-및-실행)  
4. [🖼️ 스크린샷](#️-스크린샷)  
5. [📋 API 명세](#️-api-명세)  
6. [🤝 기여 방법](#-기여-방법)  
7. [📄 라이선스](#-라이선스)  

---

## 🚀 주요 기능

- **게시글 CRUD**  
  - 글 작성(Create), 목록 조회(Read), 수정(Update), 삭제(Delete)
- **댓글 기능** (구현)  
  - 각 게시글에 댓글 작성·수정·삭제
- **페이징 & 검색** (구현중)
  - 목록 페이지네이션 및 키워드 검색
- **사용자 인증** (구현중)  
  - JWT 기반 로그인/로그아웃
- **반응형 UI** (구현중)  
  - 모바일/데스크탑 대응

---

## 🧰 기술 스택

| 구분            | 기술                                                         |
| -------------- | ------------------------------------------------------------ |
| **UI**         | React, React DOM (Create React App)                          |
| **상태 관리**   | React Hooks (`useState`, `useReducer`), Context API          |
| **라우팅**      | React Router DOM(v7.6.3)                                      |
| **HTTP 클라이언트** | Axios                                                      |
| **스타일링**     | TailwindCSS(v3.4.1), MUI, Emotion                            |
| **서버**        | Java 21, Spring Boot 3.4.5 (Web, Data JPA)                   |
| **데이터베이스** | MySQL (MySQL Connector/J), Hibernate (JPA)                   |
| **테스트**      | React Testing Library, JUnit, Spring Boot Test               |
| **인증**        | 미구현 (추후 JWT 기반 예정)                                       |
| **배포**        | 미구현                                                       |

---

## ⚙️ 설치 및 실행


### 1. 리포지터리 클론
```bash
git clone https://github.com/YourUsername/YourRepoName.git
cd YourRepoName
```

### 2. 백엔드 실행
```bash
cd prac
./gradlew bootRun
```

### 3. 프런트엔드 실행
```bash
cd react_p
npm install
npm start
```