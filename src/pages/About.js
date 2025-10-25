import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col items-center min-h-screen py-10 px-4 sm:py-14 sm:px-6 lg:px-8'>
      <div className='max-w-6xl w-full   p-6 md:p-10 lg:p-14'>

        {/* Header Section */}
        <div className='text-center mb-14 lg:mb-20'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 lg:w-24 lg:h-24 bg-[#043442] rounded-full flex items-center justify-center'>
              <span className='text-3xl lg:text-4xl text-white'>📄</span>
            </div>
          </div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#043442] mb-4 leading-tight'>
            About Our AI Resume Builder
          </h1>
          <div className='w-24 h-1 bg-[#043442] mx-auto mb-6'></div>
          <p className='text-lg sm:text-xl lg:text-2xl text-[#043442]/80 max-w-3xl mx-auto leading-relaxed'>
            Craft professional, ATS-friendly resumes effortlessly with the power of Artificial Intelligence.
          </p>
        </div>

        {/* Mission Section */}
        <div className='flex flex-col lg:flex-row items-center justify-between mb-20 gap-10'>
          <div className='lg:w-1/2'>
            <img
              src="https://media.istockphoto.com/id/2232814463/photo/modern-hr-technology-using-artificial-intelligence-to-evaluate-candidate-skills-and-resume.jpg?s=1024x1024&w=is&k=20&c=PXbYL03lELz03bc4PTYIcHauA5uIHlHbJ12zXZmvQmw="
              alt="AI Resume Builder Interface"
              className='w-full h-auto rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300'
            />
          </div>
          <div className='lg:w-1/2'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#043442] mb-6'>Our Mission</h2>
            <p className='text-[#043442]/80 text-base sm:text-lg lg:text-xl leading-relaxed mb-6'>
              We aim to simplify resume creation using AI-powered assistance. Whether you’re a student,
              professional, or career switcher, our intelligent platform helps you present your experience,
              skills, and achievements professionally — increasing your chances of getting shortlisted.
            </p>

            <div className='flex flex-wrap gap-4'>
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-[#043442] rounded-full mr-2'></div>
                <span className='text-[#043442]'>AI-Powered Suggestions</span>
              </div>
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-[#043442] rounded-full mr-2'></div>
                <span className='text-[#043442]'>Professional Templates</span>
              </div>
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-[#043442] rounded-full mr-2'></div>
                <span className='text-[#043442]'>Real-Time Feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className='mb-20'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#043442] mb-12'>
            Why Choose Our Platform?
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {[
              {
                title: 'AI-Powered Suggestions',
                description: 'Smart recommendations based on job role and experience.',
                icon: '🤖'
              },
              {
                title: 'Professional Templates',
                description: 'Modern ATS-friendly templates crafted by experts.',
                icon: '🎨'
              },
              {
                title: 'Grammar Optimization',
                description: 'Automatically improves sentence quality and tone.',
                icon: '✍️'
              },
              {
                title: 'Easy Export',
                description: 'Download your resume instantly as PDF or shareable link.',
                icon: '📥'
              },
              {
                title: 'Keyword Optimization',
                description: 'Boosts ATS match rate and ranking in job portals.',
                icon: '🔍'
              },
              {
                title: 'Simple UI/UX',
                description: 'No technical knowledge required — super beginner friendly.',
                icon: '⚡'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className='bg-[#e5e7e7] rounded-xl p-6 border-l-4 border-[#043442] hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
              >
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-[#043442] mb-2'>{feature.title}</h3>
                <p className='text-[#043442]/80'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className='mb-20'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#043442] mb-12'>
            How It Works
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your free account in seconds.',
                image: 'https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg'
              },
              {
                step: '2',
                title: 'Enter Details',
                description: 'Add experience, skills, education, and projects.',
                image: 'https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.jpg?s=1024x1024&w=is&k=20&c=Yl2vAj5d5BSoi3c68LSli-1Ikbrah3bREJ4LdJGNqhs='
              },
              {
                step: '3',
                title: 'AI Enhances',
                description: 'Our AI optimizes your resume content.',
                image: 'https://media.istockphoto.com/id/2197955227/photo/humans-are-using-laptops-and-computers-to-interact-with-ai-helping-them-create-code-train-ai.webp?a=1&b=1&s=612x612&w=0&k=20&c=p8GsIZS4sS58ubkyslWk6ChVyDe5S4HDwxxznIsm-v4='
              },
              {
                step: '4',
                title: 'Download Resume',
                description: 'Get your polished resume instantly.',
                image: 'https://media.istockphoto.com/id/1409066273/photo/candidate-resume-neon-icon-personnel-search-concept-3d-render-illustration.jpg?s=1024x1024&w=is&k=20&c=bzB3l1uO1ErYPAIZ743XE9PbLVPbeLkC4a3RugCQQFs='
              }
            ].map((item, index) => (
              <div key={index} className='text-center flex flex-col items-center'>
                <div className='relative mb-4'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-32 h-24 object-cover rounded-lg shadow-md'
                  />
                  <div className='absolute -top-2 -right-2 w-9 h-9 bg-[#043442] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg'>
                    {item.step}
                  </div>
                </div>
                <h3 className='text-lg font-semibold text-[#043442] mb-1'>{item.title}</h3>
                <p className='text-[#043442]/80 text-sm'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className='bg-[#043442]/10 rounded-2xl p-8 text-center mb-16'>
          <h2 className='text-2xl lg:text-3xl font-semibold text-[#043442] mb-4'>
            Our Vision
          </h2>
          <p className='text-[#043442]/90 text-lg max-w-4xl mx-auto leading-relaxed'>
            We aspire to become the smartest career assistant, providing resume building,
            AI interview preparation, cover letter generation, and smart job recommendations — all
            in one platform. Our goal is to help every user unlock better career opportunities.
          </p>
        </div>

        {/* CTA */}
        <div className='text-center'>
          <button className='bg-[#043442] hover:bg-[#032f36] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg'>
            Start Building Your Resume
          </button>
          <p className='text-[#043442]/80 mt-4'>
            Join thousands of users already landing better job opportunities.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
