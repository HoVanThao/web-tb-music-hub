import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem 2rem;
  

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .form-title {
    
  }

  .upload-section {
    display: flex;
    gap: 10rem;
  }

  .upload-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .upload-icon {
    width: 10rem;
    cursor: pointer;
  }

  /* .form-center {
    
  } */

  .form-row {
    width: 30rem;
    margin-bottom: 0.5rem;
  }

  .form-btn {
    /* align-self: end; */
    margin-top: 1rem;
    width: 30rem;
  }

  @media (max-width: 610px) {

    .upload-section {
      display: flex;
      gap: 2rem;
    }

    .form-row {
      width: 22rem; /* Điều chỉnh kích thước cho màn hình nhỏ hơn 992px */
    }

    .form-btn {
      box-sizing: border-box;
      width: 22rem; /* Điều chỉnh kích thước cho màn hình nhỏ hơn 992px */
    }

    .form-center {
      display: flex;
      flex-direction: column;
      gap: 1rem; /* Điều chỉnh khoảng cách giữa các phần tử bên trong .form-center */
    }
  }

  /* @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

    
  } */
  
  @media (min-width: 1120px) {
    .form-center {
        /* display: flex;
        flex-direction: column; */
    }
    
  }
`;

export default Wrapper;


