export type Announce = {
  announce: string;
};

export const requestForAnnounce = () => {
  return Promise.resolve<Announce[]>([{ announce: "反馈交流群：722942376" }]);
};
