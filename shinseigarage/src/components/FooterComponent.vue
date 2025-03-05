<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <i class="fas fa-car"></i> Shinsei Garage
        </div>
        <div class="footer-links">
          <div class="link-column">
            <h4>Quick Links</h4>
            <a href="#"><i class="fas fa-home"></i> Home</a>
            <a href="#"><i class="fas fa-car"></i> Vehicles</a>
            <a href="#"><i class="fas fa-tools"></i> Services</a>
          </div>
          <div class="link-column">
            <h4>Contact</h4>
            <p><i class="fas fa-map-marker-alt"></i> 123 Car Street</p>
            <p><i class="fas fa-phone"></i> (555) 123-4567</p>
            <p><i class="fas fa-envelope"></i> info@shinseigarage.com</p>
          </div>
          <div class="link-column">
            <h4>Follow Us</h4>
            <div class="social-icons">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © 2024 Shinsei Garage. All Rights Reserved.
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background: rgba(30, 30, 30, 0.9);
    color: rgba(255, 0, 0, 1);
    padding: 2rem;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .footer-logo {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .footer-links {
    display: flex;
    gap: 2rem;
  }
  
  .link-column {
    display: flex;
    flex-direction: column;
  }
  
  .link-column h4 {
    margin-bottom: 1rem;
    border-bottom: 2px solid rgba(255, 0, 0, 1);
    padding-bottom: 5px;
  }
  
  .link-column a, .link-column p {
    color: rgba(255, 0, 0, 1);
    text-decoration: none;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .social-icons {
    display: flex;
    gap: 15px;
  }
  
  .social-icons a {
    font-size: 1.5rem;
    color: rgba(255, 0, 0, 1);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 0, 0, 0.2);
  }
  </style>