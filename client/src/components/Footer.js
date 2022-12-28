import React from "react";
import styled from 'styled-components';
import {BsLinkedin, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import {Link} from "react-router-dom";
import { useCategories } from "../context/categories_context";
import { useAuth, logout } from '../auth'

const Footer = () => {
    const categories=useCategories();

  return (
    <FooterWrapper>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify about">Kursiki is an initiative to help the upcoming programmers start their career path. 
            We focuse on providing the most understandable guides and tutorials. We will help programmers build 
            up concepts in different programming languages that include Python, JavaScript, C#, CSS, HTML, PHP, Java, 
            SQL and so more in the future.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
                {categories?.map((category, idx) => (
                    <li><Link to = {`/category/${category.id}`}>{category.name}</Link></li>
                ))
                }
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><Link to = '/' onClick={()=>{logout()}}>Logout</Link></li>
              <li><Link to = '/login'>Login</Link></li>
              <li><Link to = '/signup'>Sign up</Link></li>
              <li><Link to = '/my-profile'>My profile</Link></li>
              <li><Link to = '/add-course'>Add course</Link></li>
            </ul>
          </div>
        </div>
        <hr></hr>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by<a href="#"> Kursiki</a>.</p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><BsFacebook/></a></li>
              <li><a class="twitter" href="#"><BsTwitter/></a></li>
              <li><a class="youtube" href="#"><BsYoutube/></a></li>
              <li><a class="linkedin" href="#"><BsLinkedin/></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
</FooterWrapper>
  );
};
const FooterWrapper = styled.div`
.about{
    font-size: 1.2rem;
}
.site-footer
{
  background-color:#26272b;
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;
  border-top: 1px solid black;
  
}
.site-footer hr
{
    border: 1px solid #9f36f5;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#a92be3;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#a92be3;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.twitter:hover
{
  background-color:#00aced
}
.social-icons a.linkedin:hover
{
  background-color:#007bb6
}
.social-icons a.youtube:hover
{
  background-color:#ea4c89
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}`

export default Footer;