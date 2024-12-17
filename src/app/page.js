import Hero from './Home/components/Hero';
import AboutUsSection from './Home/components/AboutUsSection'
import TutoringSection from './Home/components/TutoringSection'
import OurModules from './Home/components/OurModules';
import OurCourses from './Home/components/OurCourses';
import Testimonials from './Home/components/Testimonials';
import MeetTeachersStudents from './Home/components/MeetTeachersStudents';
import CTASection from './Home/components/CTASection';


export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUsSection/>
      <TutoringSection/>
      <OurModules />
      <OurCourses />
      <MeetTeachersStudents />
      <Testimonials />
      <CTASection/>
    </div>
  );
}
