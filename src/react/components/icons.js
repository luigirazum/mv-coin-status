import PropTypes from 'prop-types';

export const LensIcon = () => (
  <div data-testid="lensIcon" className="appIcon lensIcon">
    <svg id="filter-icon" fill="currentColor" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>lens-icon</title>
      <path d="M0 14.048q0 2.848 1.12 5.44t2.976 4.48 4.48 2.976 5.472 1.12q4.064 0 7.52-2.24l5.312 5.312q0.864 0.864 2.112 0.864t2.144-0.864 0.864-2.112-0.864-2.144l-5.312-5.312q2.24-3.456 2.24-7.52 0-2.88-1.12-5.472t-2.976-4.448-4.48-3.008-5.44-1.12q-2.88 0-5.472 1.12t-4.48 3.008-2.976 4.448-1.12 5.472zM4 14.048q0-2.752 1.344-5.056t3.648-3.648 5.056-1.344q2.688 0 5.024 1.344t3.648 3.648 1.344 5.056q0 2.72-1.344 5.024t-3.648 3.648-5.024 1.344q-2.752 0-5.056-1.344t-3.648-3.648-1.344-5.024z" />
    </svg>
  </div>
);

export const CancelIcon = () => (
  <div data-testid="cancelIcon" className="appIcon cancelIcon">

    <svg id="cancel-icon" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>cancel-icon</title>
      <g transform="translate(91.520000, 91.520000)">
        <polygon fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48" />
      </g>
    </svg>
  </div>
);

export const GoBackIcon = () => (
  <div className="appIcon goBackIcon" data-testid="goBackIcon">
    <svg
      fill="currentColor"
      height="1em"
      width="1em"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 492 492"
      xmlSpace="preserve"
    >
      <title>back-icon</title>
      <g>
        <g>
          <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" />
        </g>
      </g>
    </svg>
  </div>
);

export const MoreIcon = () => (
  <div className="appIcon moreIcon" data-testid="moreIcon">
    <svg width="1em" height="1em" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>more-icon</title>
      <defs />
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-420.000000, -6559.000000)" fill="currentColor">
          <g transform="translate(56.000000, 160.000000)">
            <path d="M375.127681,6399.29274 C374.737008,6398.90242 374.104537,6398.90242 373.714864,6399.29274 C373.324191,6399.68307 373.324191,6400.31497 373.714864,6400.7043 L380.149475,6407.14215 C380.464211,6407.45661 380.241398,6408.00167 379.79677,6408.00167 L365.016149,6408.00167 C364.464611,6408.00167 364,6408.44091 364,6408.99195 L364,6408.99594 C364,6409.54699 364.464611,6409.99821 365.016149,6409.99821 L379.79677,6409.99821 C380.241398,6409.99821 380.464211,6410.52829 380.149475,6410.84275 L373.68389,6417.29957 C373.293217,6417.68889 373.293217,6418.3188 373.68389,6418.70913 L373.68389,6418.70813 C374.073563,6419.09746 374.706034,6419.09746 375.096707,6418.70713 L383.41474,6410.39652 L383.41474,6410.39652 C384.195087,6409.61687 384.195087,6408.35206 383.41474,6407.57241 C383.233892,6407.39272 374.946832,6399.11206 375.127681,6399.29274" />
          </g>
        </g>
      </g>
    </svg>
  </div>
);

export const HomeIcon = () => (
  <div className="appIcon homeIcon" data-testid="homeIcon">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <title>home-icon</title>
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19zm2-4h8v2H8v-2z" />
      </g>
    </svg>
  </div>
);

export const GenericCoinIcon = () => (
  <div className="appIcon GenericCoinIcon" data-testid="GenericCoinIcon">
    <svg viewBox="0 0 32 32" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg">
      <title>generic-coin-icon</title>
      <g fill="none" fillRule="evenodd">
        <circle cx="16" cy="16" fill="none" fillRule="nonzero" r="16" />
        <path d="m21.0016811 9.85510634c1.6897551 1.33163836 2.783213 3.29254076 2.9983189 5.42275566l-2.8469125-.7079642c-.516741-1.7465785-1.9381257-3.1886804-3.8595386-3.6664934-2.8669261-.7129411-5.7614386.9909294-6.4650747 3.8057014s1.0500569 5.6745486 3.9169829 6.3874898c1.9214129.4778129 3.8552168-.1299277 5.1335833-1.4301011l2.8469137.7079631c-1.1926169 1.7801454-3.0810774 2.9995105-5.1998433 3.3840538l-.8103066 3.2414886-2.5955144-.6454471.6435642-2.5744648c-.2182891-.0358764-.4369079-.0808557-.6554199-.1351948-.2185119-.0543391-.4327125-.1169924-.6423373-.1875288l-.6435642 2.5744648-2.5955144-.6454471.8103066-3.2414885c-2.37860505-1.8744976-3.57563879-4.9958905-2.80436501-8.081235s3.29742791-5.2808629 6.27993531-5.82217012l.8103067-3.24148858 2.5955144.64544711-.6435642 2.57446483c.2182891.03587638.4369079.08085562.6554198.13519472.218512.0543391.4327126.11699249.6423374.18752883l.6435642-2.57446483 2.5955144.64544711z" fill="currentColor" />
      </g>
    </svg>
  </div>
);

export const CoinsIcon = () => (
  <div className="appIcon CoinsIcon" data-testid="CoinsIcon">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <title>coins-icon</title>
      <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
    </svg>
  </div>
);

export const CoinIcon = () => (
  <div className="appIcon CoinIcon" data-testid="CoinIcon">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M23 12v2c0 3.314-4.925 6-11 6-5.967 0-10.824-2.591-10.995-5.823L1 14v-2c0 3.314 4.925 6 11 6s11-2.686 11-6zM12 4c6.075 0 11 2.686 11 6s-4.925 6-11 6-11-2.686-11-6 4.925-6 11-6z" />
      </g>
    </svg>
  </div>
);

export const CryptoIcon = ({ symbol }) => {
  const iconSymbol = symbol.trim().toUpperCase();

  return (
    symbol && (
    <span className={`cryptoicon icon-${iconSymbol}`} />
    )
  );
};

CryptoIcon.propTypes = {
  symbol: PropTypes.string,
};

CryptoIcon.defaultProps = {
  symbol: '',
};

export const CryptoSvgIcon = ({ children }) => (
  <>{children}</>
);

CryptoSvgIcon.propTypes = {
  children: PropTypes.element.isRequired,
};
