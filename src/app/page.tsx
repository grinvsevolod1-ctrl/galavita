import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
  {/* Фоновое изображение */}
  {banner.image && (
    <div className="absolute inset-0 z-0">
      <ImageFallback
        src={banner.image}
        alt="Galavita Stroy Banner"
        fill
        className="object-cover blur-sm brightness-75"
        priority
      />
    </div>
  )}

  {/* Контент с адаптивным фоном */}
  <div className="relative z-10 px-6 py-10 rounded-xl max-w-3xl text-center bg-white/90 dark:bg-darkmode-light/90 text-black dark:text-white shadow-lg">
    <h1
      className="mb-4 text-h3 lg:text-h1"
      dangerouslySetInnerHTML={markdownify(banner.title)}
    />
    <p
      className="mb-8 text-lg"
      dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
    />
    {banner.button?.enable && (
      <Link
        className="btn btn-primary"
        href={banner.button.link}
        target={
          banner.button.link.startsWith("http") ? "_blank" : "_self"
        }
        rel="noopener"
      >
        {banner.button.label}
      </Link>
    )}
  </div>
</section>



      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 ? "bg-gradient" : ""}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 ? "md:order-2" : ""
                }`}
              >
                {feature.image && (
                  <ImageFallback
                    src={feature.image}
                    height={480}
                    width={520}
                    alt={feature.title}
                  />
                )}
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 ? "md:order-1" : ""
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className="absolute left-0 top-1.5" />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button?.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
