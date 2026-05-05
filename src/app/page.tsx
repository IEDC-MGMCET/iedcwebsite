import RevealWrapper from '@/components/ui/RevealWrapper'
import HeroSection from '@/components/sections/HeroSection'
import MarqueeStats from '@/components/sections/MarqueeStats'
import JourneySection from '@/components/sections/JourneySection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ExecomSection from '@/components/sections/ExecomSection'
import EventsSection from '@/components/sections/EventsSection'
import IdeaGeneratorSection from '@/components/sections/IdeaGeneratorSection'
import WhySection from '@/components/sections/WhySection'

export default function HomePage() {
  return (
    <RevealWrapper>
      <HeroSection />
      <MarqueeStats />
      <JourneySection />
      <FeaturesSection />
      <ExecomSection />
      <EventsSection />
      <WhySection />
      <IdeaGeneratorSection />
    </RevealWrapper>
  )
}
