const videos = [
  {
    thumbnailUrl: "https://img.youtube.com/vi/38rh7-v6p6A/maxresdefault.jpg",
    title: "Manali | Top 5 things to do | travel video",
    creator: "Hopping bug",
    tag: ["manali", "hopping bug"],
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/38rh7-v6p6A",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqPsXnUSXBRxMWH0XqaUlD0nTIJ_anaxMTU4DCY1fg=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/FH049_hTlVU/maxresdefault.jpg",
    tag: ["manali", "tanya"],
    title: "Manali | Top 5 things to do | travel video",
    creator: "Tanya Khanijow",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/FH049_hTlVU",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqOPT1qUqk7w4SjcXAzcvfWNO4C5E8azTMawBViCs5o=s176-c-k-c0x00ffffff-no-rj",
  },

  {
    thumbnailUrl: "https://img.youtube.com/vi/CSFg-_vgp_Y/maxresdefault.jpg",
    tag: ["shillong", "hopping bug"],
    title: "exploring shillong city| travel video",
    creator: "hopping bug",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/CSFg-_vgp_Y",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqPsXnUSXBRxMWH0XqaUlD0nTIJ_anaxMTU4DCY1fg=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/k9TwUctL1Do/maxresdefault.jpg",
    tag: ["shillong", "tanya"],
    title: "top 5 places in shillong | travel video",
    creator: "tanya khanijow",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/k9TwUctL1Do",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqOPT1qUqk7w4SjcXAzcvfWNO4C5E8azTMawBViCs5o=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/G9jQbRoDH2w/maxresdefault.jpg",
    tag: ["shillong", "ankit bhatia"],
    title: "Exploring shillong | travel video",
    creator: "ankit bhatia",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/G9jQbRoDH2w",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqNg-mnEaWvEpBjDCmvWx27S_jx3HAVxLFL2AXzRQA=s176-c-k-c0x00ffffff-no-rj-mo",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/NkwxaZpuNQM/maxresdefault.jpg",
    tag: ["varanasi", "curly tales"],
    title: "newly built kashi vishwanath Dham| travel video",
    creator: "curly tales",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/NkwxaZpuNQM",
    channelImg:
      "https://yt3.googleusercontent.com/zdU2A41m8coX5YUdqKM1Wb9fQYAwpX_u3qOErZlSEx-u0Rnw3-CnB_dSxtRJ3LCkGihs6fBe=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/6NFc3h0dR_k/maxresdefault.jpg",
    tag: ["varanasi"],
    title: "Varanasi -Manikarnika, ganga arti boat ride| travel video",
    creator: "larissa Dsa",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/6NFc3h0dR_k",
    channelImg:
      "https://yt3.googleusercontent.com/j_BeXI_o-Dgm6aPSZF3xhP1SUjahq02bO95Pa093Qhol1INOBSEEE0pjfxHDN7Jjw9x_4s8PmA=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/XzwVlTrIlgc/maxresdefault.jpg",
    tag: ["varanasi"],
    title: "BANARSI BABU|varanasi vlog| travel video",
    creator: "camerawalebhaiya",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/XzwVlTrIlgc",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqP5k1GRg8_eAmD2_jG7sCNE4bLw_ey4kcmWQUYv=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/5qRu0QQwaeo/maxresdefault.jpg",
    tag: ["goa"],
    title: "Exploring North Goa| travel video",
    creator: "camerawalebhaiya",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/5qRu0QQwaeo",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqP5k1GRg8_eAmD2_jG7sCNE4bLw_ey4kcmWQUYv=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/ZciOqlQ-tlY/maxresdefault.jpg",
    tag: ["goa"],
    title: "can you believe it| travel video",
    creator: "hopping bug",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/ZciOqlQ-tlY",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqPsXnUSXBRxMWH0XqaUlD0nTIJ_anaxMTU4DCY1fg=s176-c-k-c0x00ffffff-no-rj",
  },
  {
    thumbnailUrl: "https://img.youtube.com/vi/ge-Gu1GMZ9c/maxresdefault.jpg",
    tag: ["goa"],
    title: "North Goa vlog| travel video",
    creator: "tanya khanijow",
    likes: [],
    watchlater: [],
    videoUrl: "https://www.youtube.com/embed/ge-Gu1GMZ9c",
    channelImg:
      "https://yt3.googleusercontent.com/ytc/AGIKgqOPT1qUqk7w4SjcXAzcvfWNO4C5E8azTMawBViCs5o=s176-c-k-c0x00ffffff-no-rj",
  },
];

module.exports = videos;
