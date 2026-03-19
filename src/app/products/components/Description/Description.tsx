import Text from 'components/Text';
import styles from './Description.module.scss';

const Description = () => {
  return (
    <div className={styles.container}>
      <Text view="title">Products</Text>
      <Text view="p-20" color="secondary" className={styles.text}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
    </div>
  );
};

export default Description;
