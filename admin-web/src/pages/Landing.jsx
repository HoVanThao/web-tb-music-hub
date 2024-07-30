import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Music <span>Admin</span>
          </h1>
          <p>
            Chào mừng đến với Bảng Điều Khiển Quản Trị của TB Music Hub!
            Xin chào Admin, Hồ Văn Thảo!
            Chúng tôi rất vui được thấy bạn quay lại. Hãy cùng nhau quản lý và nâng cao trải nghiệm nghe nhạc cho người dùng.
            Chúc bạn một ngày làm việc hiệu quả!
          </p>
          <Link to='/login' className='btn'>
            Đăng nhập
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

// const StyledWrapper = styled.section`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width); 
//     padding: 0 20px; 
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }
//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }
//   h1 {
//     font-weight: 500;
//     span {
//       color: var(--primary-500);
//     }
//     margin-bottom: 1.5rem;
//   }
//   p {
//     line-height: 2;
//     color: var(--text-secondary-color);
//     margin-bottom: 1.5rem;
//     max-width: 35em;
//   }
//   .register-link {
//     margin-right: 1rem;
//   }
//   .main-img {
//     display: none;
//   }
//   .btn {
//     padding: 0.75rem 1rem;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: 1fr 400px;
//       column-gap: 3rem;
//     }
//     .main-img {
//       display: block;
//     }
//   }
// `;

export default Landing;