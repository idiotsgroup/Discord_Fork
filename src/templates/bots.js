import React from 'react';
import PropTypes from 'prop-types';

import { ItemPropType } from './../proptypes';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import ProfileCard from './../components/ProfileCard';
import Carousel from './../components/Carousel';
import CarouselImage from './../components/CarouselImage';
import Cards from './../components/Cards';
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby';

import './item.scss';

class Bots extends React.Component {
  render() {
    const { markdownRemark } = this.props.data;
    const { frontmatter, fields, html } = markdownRemark;
    let album = null;
    
    if (frontmatter.images) {
      album = (
        <div>
          <hr />
          <Carousel settings={{
            dots: true,
            infinite: true,
            speed: 500,
            className: 'carousel',
            focusOnSelect: true,
            centerMode: true,
            variableWidth: true,
            swipeToSlide: true
          }}>
            {frontmatter.images.map((image, key) => (
              <CarouselImage src={`/userassets/${fields.template}/${fields.filename}-image-${key}.png`} key={key}/>
            ))}
          </Carousel>
        </div>
      );
    }

    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots" image={frontmatter.cover ? `/userassets/${fields.template}/${fields.filename}-cover.png` : null}>
        <Global title={frontmatter.pagename} description={frontmatter.description} image={`/userassets/${fields.template}/${fields.filename}-256.png`} />
        <Cards>
          <ProfileCard post={{ frontmatter, fields }}></ProfileCard>
        </Cards>
        <div className="center">
          { frontmatter.link ? <a className="btn white black-text bold" href={frontmatter.link}>
            <FormattedMessage id="pages.bots.invite" />
          </a> : null }
          { frontmatter.support ? <a className="btn white black-text bold" href={frontmatter.support}>
            <FormattedMessage id="pages.items.discord" />
          </a> : null }
          { frontmatter.github && frontmatter.github.owner ? <a className="btn white black-text bold" href={`https://github.com/${frontmatter.github.owner}/${frontmatter.github.repo || ''}`}>
            <FormattedMessage id="pages.items.github" />
          </a> : null }
        </div>
        { album }
        <hr />
        <div className="custom-content" dangerouslySetInnerHTML={{ __html: html }}></div>
        <hr />
        <small>
          <FormattedMessage id="pages.items.embed" />{' '}
          <a href={`/api${fields.filelink}.svg`}>.svg</a>｜
          <a href={`/api${fields.filelink}.png`}>.png</a>
        </small>
      </SiteLayout>
    );
  }
}

Bots.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      node: ItemPropType
    })
  }),
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default Bots;

export const pageQuery = graphql`
  query BotPages($filelink: String!) {
    markdownRemark(fields: { filelink: { eq: $filelink }}) {
      html
      frontmatter {
        pagename
        avatar
        images
        cover
        description
        nsfw
        link
        support
        prefix
        github {
          owner
          repo
        }
      }
      fields {
        filename
        template
        filelink
      }
    }
  }
`;
