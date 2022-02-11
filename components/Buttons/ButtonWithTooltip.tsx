import ReactTooltip, { TooltipProps } from "react-tooltip";

type Props = {
  toolTipText: string;
  children: React.ReactNode;
  classes?: string;
  cb?: () => void;
  tooltipClasses?: string;
  [key: string]: any;
};

const ButtonWithTooltip = (props: Props) => {
  const { toolTipText, children, classes, tooltipClasses, cb, ...rest } = props;
  return (
    <button
      className={classes}
      data-tip={toolTipText}
      onClick={cb}
      data-event="click"
      data-event-off="mouseleave"
    >
      {children}
      <ReactTooltip {...(rest as TooltipProps)} className={tooltipClasses} />
    </button>
  );
};

export default ButtonWithTooltip;
