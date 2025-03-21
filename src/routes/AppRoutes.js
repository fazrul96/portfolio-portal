import ComponentPage from '../pages/ComponentPage';
import MediumPage from '../pages/MediumPage';
import InboxPage from '../pages/InboxPage';
import ModulePage from '../pages/ModulePage';
import OCRPage from '../pages/OCRPage';
import ProfilePage from '../pages/ProfilePage';
import SettingPage from '../pages/SettingPage';
import SpacePage from '../pages/SpacePage';
import StoragePage from '../pages/StoragePage';
import OpenApiPage from '../pages/OpenApiPage';
import WebtoonChaptersPage from '../pages/WebtoonChaptersPage';
import WebtoonReaderPage from '../pages/WebtoonReaderPage';
import WebtoonPage from "../pages/WebtoonPage";
import MosquePage from "../pages/MosquePage";
import DonationManagementPage from "../components/section/mosque/DonationManagementPage";
import LogisticManagementPage from "../components/section/mosque/LogisticManagementPage";
import PrayerTimesPage from "../components/section/mosque/PrayerTimesPage";
import {
  ROUTE_CHAPTER,
  ROUTE_CHAPTERS,
  ROUTE_COMPONENT, ROUTE_INBOX,
  ROUTE_LOGISTIC,
  ROUTE_MEDIUM, ROUTE_ML,
  ROUTE_MODULE,
  ROUTE_MOSQUE,
  ROUTE_OCR,
  ROUTE_OPENAPI,
  ROUTE_PRAYER_TIMES,
  ROUTE_PROFILE,
  ROUTE_SERIES,
  ROUTE_SETTINGS,
  ROUTE_SPACE,
  ROUTE_STORAGE,
  ROUTE_USERS,
  ROUTE_WEBTOON,
  ROUTE_WORKSPACE
} from "../constants/AppRoutes";
import MachineLearningPage from "../pages/MachineLearningPage";

export const publicRoutes = [
  { path: ROUTE_MEDIUM, component: <MediumPage /> },
  { path: ROUTE_INBOX, component: <InboxPage /> },

  { path: ROUTE_MODULE, component: <ModulePage /> },
  { path: ROUTE_MODULE + ROUTE_COMPONENT, component: <ComponentPage /> },
  { path: ROUTE_MODULE + ROUTE_OCR, component: <OCRPage /> },
  { path: ROUTE_MODULE + ROUTE_MOSQUE, component: <MosquePage /> },
  { path: ROUTE_MODULE + ROUTE_ML, component: <MachineLearningPage /> },

  { path: ROUTE_MOSQUE + ROUTE_USERS, component: <DonationManagementPage /> },
  { path: ROUTE_MOSQUE + ROUTE_LOGISTIC, component: <LogisticManagementPage /> },
  { path: ROUTE_MOSQUE + ROUTE_PRAYER_TIMES, component: <PrayerTimesPage /> },
//  { path: '/module/calendar', component: <CalendarPage /> },
];

export const protectedRoutes = [
  { path: ROUTE_PROFILE, component: <ProfilePage /> },
  { path: ROUTE_SETTINGS, component: <SettingPage /> },
  { path: ROUTE_SPACE, component: <SpacePage /> },

  { path: ROUTE_WORKSPACE + ROUTE_SPACE, component: <SpacePage /> },
  { path: ROUTE_WORKSPACE + ROUTE_STORAGE, component: <StoragePage /> },
  { path: ROUTE_WORKSPACE + ROUTE_OPENAPI, component: <OpenApiPage /> },
  { path: ROUTE_WORKSPACE + ROUTE_WEBTOON, component: <WebtoonPage /> },

  { path: ROUTE_SERIES + ROUTE_CHAPTERS, component: <WebtoonChaptersPage /> },
  { path: ROUTE_SERIES + ROUTE_CHAPTER, component: <WebtoonReaderPage /> },
];