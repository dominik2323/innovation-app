import React from 'react';
import { motion } from 'framer-motion';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
  setActiveInnovationId,
  setHoverInnovationId,
  setCurrentSlideshowIndex,
  toggleSidebar,
} from '../store/actions';

import { DataContext } from '../helpers/dataContext';
import Link from './Link';
import Scrollbar from './Scrollbar';
import Img from './Img';
import Button from './Button';
import { useAuth } from '../hocs/auth';
import strings from '../../globals/strings';

const InnovationContents = ({ ...props }) => {
  const { components, innovations } = React.useContext(DataContext);
  const prevHoveredEl = React.useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { contents, contents_about_link } = components;
  const { isAllowed, isAuthenticated, isBlocked } = useAuth();
  const { lang } = router.query;

  const handleClick = (e) => {
    Router.push(
      `/[lang]/innovations`,
      `/${lang}/innovations?id=${e.currentTarget.id}`
    );
    dispatch(setActiveInnovationId(e.currentTarget.id));
    dispatch(setCurrentSlideshowIndex(0));
    dispatch(toggleSidebar(`half`));
  };

  const handleHover = (e) => {
    if (prevHoveredEl.current !== null) {
      prevHoveredEl.current.classList.remove('hover');
    }
    e.target.classList.add('hover');
    prevHoveredEl.current = e.target;
    dispatch(setHoverInnovationId(e.target.id));
  };

  React.useEffect(() => {
    const contentEls = document.querySelectorAll(
      '.innovation-contents__contents__item.allowed'
    );
    handleHover({ target: contentEls[0] });
    Array.prototype.forEach.call(contentEls, (el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('click', handleClick);
    });
    return () => {
      Array.prototype.forEach.call(contentEls, (el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const InnovationContent = ({ id, uid, innovationname }, i) => {
    return (
      <motion.div
        key={id}
        id={uid}
        className={`innovation-contents__contents__item allowed`}
        variants={{
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <span>{i < 9 ? `0${i + 1}` : i + 1}</span>
        <h2>{innovationname}</h2>
      </motion.div>
    );
  };

  return (
    <motion.div className={`innovation-contents`} {...props}>
      <div className={`innovation-contents__header`}>
        <h1>{contents}</h1>
        <Link
          handleClick={() =>
            Router.push(`/[lang]/about`, `/${router.query.lang}/about`)
          }
        >
          {contents_about_link}
        </Link>
      </div>
      <div className={`innovation-contents__contents`}>
        <Scrollbar vTrackStyle={{ left: 0, right: `unset` }}>
          {!isAllowed && !isBlocked && isAuthenticated && (
            <div className={`innovation-contents__contents__status`}>
              <div className='loading green' />
              <div>
                <h2>{strings[lang].innovation_content_not_allowed_header}</h2>
                <p>{strings[lang].innovation_content_not_allowed_perex}</p>
              </div>
            </div>
          )}
          {!isAuthenticated && (
            <div className={`innovation-contents__contents__status`}>
              <div>
                <h2>
                  {strings[lang].innovation_content_not_registered_header}
                </h2>
                <p>{strings[lang].innovation_content_not_registered_perex}</p>
                <Button
                  handleClick={() =>
                    router.push(`/[lang]/login`, `/${lang}/login`)
                  }
                  className={`btn__secondary--green`}
                >
                  {strings[lang].button_login}
                </Button>
              </div>
            </div>
          )}
          {isBlocked && (
            <div className={`innovation-contents__contents__status`}>
              <div>
                <h2>{strings[lang].innovation_content_blocked_header}</h2>
                <p>{strings[lang].innovation_content_blocked_perex}</p>
              </div>
            </div>
          )}

          {innovations.map((props, i) => {
            if (!props.is_secret) return InnovationContent(props, i);
            if (isAllowed && !isBlocked) return InnovationContent(props, i);
            return (
              <div
                className={`innovation-contents__contents__item not-allowed`}
              >
                <span>{i < 9 ? `0${i + 1}` : i + 1}</span>
                <h2>
                  <Img src={`/static/icons/lock.svg`} />
                  {strings[lang].locked}
                </h2>
              </div>
            );
          })}
        </Scrollbar>
      </div>
    </motion.div>
  );
};

export default InnovationContents;
