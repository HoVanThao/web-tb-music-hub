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
    /* display: flex; */
    flex-direction: column;
    gap: 2rem;
  }

  .upload-section {
    margin-bottom: 1rem;
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

  .form-row {
    width: 30rem;
    margin-bottom: 1rem;
  }

  .form-color {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
  }

  .form-btn {
    margin-top: 1rem;
    width: 30rem;
  }

  .loading {
    
  }

  .spinner {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 610px) {
    .upload-section {
      gap: 2rem;
    }

    .form-row, .form-btn {
      width: 22rem;
    }

    .form-center {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {

    }
  }
`;

export default Wrapper;
