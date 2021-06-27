import {Tabs, TabList, Tab, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import TextEditor from "../../components/TextEditor";

const PadPage: React.FC = () => {
    return (<div>
        <Tabs className="mr-10">
            <TabList>
                <Tab>Editor</Tab>
                <Tab>Contribuidores</Tab>
                <Tab>Configurações</Tab>
            </TabList>

            <TabPanel>
                <TextEditor/>
            </TabPanel>

            <TabPanel>
                <ul>
                    <li>rodrigo</li>
                    <li>nathalia</li>
                </ul>
            </TabPanel>

            <TabPanel>
                Configuracoes
            </TabPanel>
        </Tabs>
    </div>)
}

export default PadPage;