import './BaseCard.scss';

export default function BaseCard(props) {
  return  <div id="card">
            {props.children}
          </div>;
}