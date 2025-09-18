"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useFetchGuides } from "@/hooks/useUsers";
import useUserStore from "@/stores/userStore";
import type { GuideDTO } from "@/dto/guide.dto";

export default function GuideArea() {
  const { guides } = useUserStore();
  const { fetchGuides, loading } = useFetchGuides();

  // Fetch approved guides
  useEffect(() => {
    fetchGuides({
      page: 1,
      limit: 12,
      status: "approved",
      sortField: "createdAt",
      sortOrder: -1,
    });
  }, [fetchGuides]);

  const approvedGuides = useMemo(
    () =>
      (Array.isArray(guides) ? guides : []).filter(
        (g) => g?.approvalStatus === "approved",
      ),
    [guides],
  );

  const swiperOpts: SwiperOptions = {
    speed: 900,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: ".review-pagination", clickable: true },
    navigation: { nextEl: ".bannerPrev1", prevEl: ".bannerNext1" },
    breakpoints: {
      280: { slidesPerView: 1, navigation: false },
      480: { slidesPerView: 1, navigation: false },
      768: { slidesPerView: 2, navigation: false },
      992: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    },
  };

  // helper to read role name from either a string role or an object
  // const roleNameOf = (g: GuideDTO) =>
  //   (typeof g.role === "string" ? g.role : g.role?.name) || "guide";

  // robust social getters
  // const socialsOf = (g: any) => ({
  //   instagram:
  //     g?.instagram || g?.socials?.instagram || g?.links?.instagram || null,
  //   facebook: g?.facebook || g?.socials?.facebook || g?.links?.facebook || null,
  //   twitter: g?.twitter || g?.socials?.twitter || g?.links?.twitter || null,
  //   whatsapp: g?.whatsapp || g?.socials?.whatsapp || g?.links?.whatsapp || null,
  // }); => to use in case the socials come from the backend

  return (
    <div className="guide-wrapper mt-40">
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <div className="section-head head-left pb-40">
              <h5>Tour Guide</h5>
              <h2>Meet Our Approved Guides</h2>
            </div>
          </div>
        </div>

        <div className="guide-slider">
          <div className="slider-arrows text-center d-xl-flex d-none justify-content-between">
            <div className="bannerNext1 swiper-btn">
              <i className="bx bx-chevron-left" />
            </div>
            <div className="bannerPrev1 swiper-btn">
              <i className="bx bx-chevron-right" />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">Loading guides…</div>
          ) : approvedGuides.length === 0 ? (
            <div className="text-center py-5">No approved guides yet.</div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay, EffectFade, Pagination]}
              {...swiperOpts}
            >
              {approvedGuides.map((g) => {
                const name =
                  [g.firstName, g.lastName].filter(Boolean).join(" ") ||
                  "Guide";
                const photo =
                  g.profilePhoto || "/assets/images/guide/placeholder.png";
                // const role = roleNameOf(g);
                const profileHref = `/guides/${g.uid}`; // <<— your route format
                // const s = socialsOf(g);

                return (
                  <SwiperSlide key={g.uid}>
                    <div className="guide-card">
                      <div className="thumb">
                        <img src={photo} alt={name} />
                        {/* vertical social icons on the image, non-overlapping */}
                        <ul className="social-rail">
                          <li>
                            <a
                              href={""}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Instagram"
                            >
                              <i className="bx bxl-instagram" />
                            </a>
                          </li>

                          <li>
                            <a
                              href={""}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Facebook"
                            >
                              <i className="bx bxl-facebook" />
                            </a>
                          </li>

                          <li>
                            <a
                              href={""}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Twitter"
                            >
                              <i className="bx bxl-twitter" />
                            </a>
                          </li>

                          <li>
                            <a
                              href={""}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="WhatsApp"
                            >
                              <i className="bx bxl-whatsapp" />
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="info">
                        <strong className="name">{name}</strong>
                        <p className="role">Tour Guide</p>

                        <Link href={profileHref} className="view-link" prefetch>
                          View profile →
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>

      {/* Styles – keep images tidy and icons positioned safely */}
      <style jsx>{`
        .guide-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
          height: 100%;
        }
        .thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3; /* consistent height for all photos */
          background: #f3f3f3;
        }
        .thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover; /* crop oversized images */
          display: block;
        }
        .social-rail {
          position: absolute;
          left: 10px;
          top: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px 6px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(4px);
          list-style: none;
          margin: 0;
        }
        .social-rail li a {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          color: #222;
        }
        .info {
          padding: 14px 16px 18px;
        }
        .name {
          display: block;
          font-size: 1.125rem;
          line-height: 1.2;
        }
        .role {
          margin: 2px 0 10px;
          color: #6f6f6f;
        }
        .view-link {
          color: #2c5cff;
          text-decoration: none;
          font-weight: 600;
        }
        /* let slides grow naturally */
        :global(.swiper-slide) {
          height: auto;
        }
      `}</style>
    </div>
  );
}
