import ButtonWithTooltip from "../Buttons/ButtonWithTooltip";
import {
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FacebookIcon,
  RedditIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

type Props = {
  buildUrl: string | null;
};

const CopyIcon = () => (
  <svg
    className="w-4 h-4 stroke-stone-700"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 38H41V16L30 4H13V38Z"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 4V16H41"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 20V44H28"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19 20H23" strokeWidth="4" strokeLinecap="round" />
    <path d="M19 28H31" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BuildUrlWrapper = (props: Props) => {
  if (props.buildUrl == null) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-between w-full px-4 py-2 mx-auto text-sm font-bold text-center border rounded-lg shadow bg-slate-100 border-neutral-700 dark:border-white/20 text-neutral-900 gap-y-2">
      <a className="break-all" href={props.buildUrl}>
        {props.buildUrl}
      </a>
      <div className="flex items-center flex-shrink-0 gap-2 ">
        <ButtonWithTooltip
          cb={() => {
            navigator.clipboard.writeText(props.buildUrl as string);
          }}
          classes="p-1 text-white rounded-full bg-neutral-200 hover:bg-neutral-300"
          toolTipText="Copied!"
          place="bottom"
          type="success"
          effect="solid"
          tooltipClasses="text-neutral-900 font-bold"
          delayHide={300}
        >
          <CopyIcon />
        </ButtonWithTooltip>
        <FacebookShareButton
          url={
            "https://eg-pc-builder-frontend.vercel.app/build/fed43fd7-3323-4673-9151-86fa6c00929c"
          }
          quote={`Check out this awesome build I made!`}
          hashtag="#pcbuilder"
        >
          <FacebookIcon size={24} round={true} />
        </FacebookShareButton>
        <RedditShareButton
          url={
            "https://eg-pc-builder-frontend.vercel.app/build/fed43fd7-3323-4673-9151-86fa6c00929c"
          }
          title="Check out this awesome build I made!"
        >
          <RedditIcon size={24} round={true} />
        </RedditShareButton>
        <WhatsappShareButton
          url={
            "https://eg-pc-builder-frontend.vercel.app/build/fed43fd7-3323-4673-9151-86fa6c00929c"
          }
          title="Check out this awesome build I made!"
        >
          <WhatsappIcon size={24} round={true} />
        </WhatsappShareButton>
        <TelegramShareButton
          url={
            "https://eg-pc-builder-frontend.vercel.app/build/fed43fd7-3323-4673-9151-86fa6c00929c"
          }
          title="Check out this awesome build I made!"
        >
          <TelegramIcon size={24} round={true} />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default BuildUrlWrapper;
