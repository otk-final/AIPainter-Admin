import { useLogin } from '@/uses';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Line } from '@ant-design/plots';
import './index.less';
import { useEffect } from 'react';
import { DefaultClient } from '@/api/http';

const chartData = [
  { "Date": "01-10", count: 190, },
  { "Date": "01-11", count: 304, },
  { "Date": "01-12", count: 190, },
  { "Date": "01-13", count: 204, },
  { "Date": "01-14", count: 90, },
  { "Date": "01-15", count: 194, },
  { "Date": "01-16", count: 190, },
  { "Date": "01-17", count: 204, },
];

const chartConfig = {
  height: 400,
  padding: 'auto',
  xField: 'Date',
  yField: 'count',
  limitInPlot: true,
  xAxis: {
    // type: 'timeCat',
    tickCount: 5,
  },
};

const datas = [
  {
    key: 'newUser',
    title: '日新增用户数',
    config: {
      data: chartData,
      ...chartConfig,
      lineStyle: {
        stroke: 'black',
        lineWidth: 2,
        lineDash: [4, 5],
      },
    }
  },
  {
    key: 'vip',
    title: '日VIP新增数',
    config: {
      data: chartData,
      ...chartConfig,
    }
  },
  {
    key: 'createImage',
    title: '日生图数',
    config: {
      data: chartData,
      ...chartConfig,
      color: '#f61'
    }
  },
  {
    key: 'inference',
    title: '日推理数',
    config: {
      data: chartData,
      ...chartConfig,
    }
  },
  {
    key: 'translation',
    title: '日翻译数',
    config: {
      data: chartData,
      ...chartConfig,
    }
  },
  {
    key: 'voiceCompound',
    title: '日语音合成数',
    config: {
      data: chartData,
      ...chartConfig,
    }
  }
]

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const { loginState } = useLogin();


  useEffect(() => {
    DefaultClient.get('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json', {
      params: { name: 1 },
    })
  }, []);

  return (
    <PageContainer ghost >
      <div className='home-wrap flexR'>
        {
          datas.map((i) => {
            return (
              <div className='section-wrap flexC' key={i.key}>
                <div className='title'>{i.title}</div>
                <Line {...i.config} className="chart-wrap" />
              </div>
            )
          })
        }
      </div>
    </PageContainer>
  );
};

export default HomePage;
