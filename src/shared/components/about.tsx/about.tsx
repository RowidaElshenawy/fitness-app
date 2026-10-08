import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function AboutSection() {
  const featureList = [
    {
      title: 'Personal Trainer',
      description: 'Achieve your fitness goals with the guidance of our certified trainers.',
    },
    {
      title: 'Cardio Programs',
      description: 'From steady-state cardio to interval sprints, our treadmill programs.',
    },
    {
      title: 'Quality Equipment',
      description: 'Our gym is equipped with the latest cardio & strength machines.',
    },
    {
      title: 'Healthy Nutritions',
      description: 'Fuel your fitness journey with customized meal plans for you.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f2ef] px-20 py-8 text-[#1d1d1f] lg:px-8 lg:py-10">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto flex sm:h-[740px] h-96 w-full  items-center justify-center">
          <div className="absolute left-1 top-0 h-3/4 w-3/5 overflow-hidden rounded-[30px] bg-[#d7d5d2] shadow-[0_40px_70px_rgba(32,24,22,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
              alt="Athlete working out with a kettlebell"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute  right-0  top-4/37 h-1/4 w-3/8 overflow-hidden rounded-[28px] bg-[#d9d4d0] shadow-[0_25px_50px_rgba(32,24,22,0.15)]">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
              alt="Male athlete posing after a workout"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-[30px] bg-[#d9d4d0] shadow-[0_35px_60px_rgba(32,24,22,0.16)]">
            <img
              src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=900&q=80"
              alt="Athlete training in a dark gym"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="">
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 border-b border">
            {featureList.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6_224)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.687 11.1455C20.963 12.8694 17.8841 12.9329 16.2285 11.2773L15.5497 10.5985L14.1355 12.0127L14.8143 12.6915C16.0185 13.8957 17.6982 14.4751 19.3911 14.4413L10.6662 23.1663L12.0238 24.524L20.7488 15.799C20.7149 17.4919 21.2944 19.1716 22.4986 20.3758L23.1774 21.0546L24.5916 19.6404L23.9128 18.9616C22.2572 17.3059 22.3207 14.2271 24.0446 12.5032L24.7517 11.7961L23.3941 10.4384L22.687 11.1455Z"
                      fill="#FF4100"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_224">
                      <rect
                        width="25"
                        height="24"
                        fill="white"
                        transform="translate(0 17.6777) rotate(-45)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div>
                  <h2 className="mb-2 text-xl font-bold uppercase tracking-[-0.03em] text-[#1f1f1f] md:text-[1.05rem]">
                    {feature.title}
                  </h2>
                  <p className="text-[0.96rem] leading-relaxed text-[#5d5a59]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
            <div>
              <Button variant="outline" icon={<ArrowUpRight />}>
                Explore More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
